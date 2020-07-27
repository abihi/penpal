import {normalize} from 'normalizr'
import {user} from '../entities';
import {switchAppMode} from '../mode';

export const FETCH_USER_CREDENTIALS = 'auth/FETCH_USER_CREDENTIALS';
export const FETCH_USER_CREDENTIALS_SUCCESS = 'auth/FETCH_USER_CREDENTIALS_SUCCESS';
export const FETCH_USER_CREDENTIALS_FAIL = 'auth/FETCH_USER_CREDENTIALS_FAIL';
export const CLEAR_AUTHENTICATION_STATE = 'auth/CLEAR_AUTHENTICATION_STATE';

const initialState = {
  currentUser: null,
  isAnonymous: true,
  isActive: false,
  isAuthenticated: false,
  fetching: false,
  fetched: false,
  error: null
};

const axios = require('axios');
axios.defaults.withCredentials = true;

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_CREDENTIALS:
    {
      return {
        ...state,
        fetching: true
      };
    }
    case FETCH_USER_CREDENTIALS_SUCCESS:
    {
      return {
        ...state,
        fetching: false,
        fetched: true,
        currentUser: action.payload.result,
        isAnonymous: action.isAnonymous,
        isActive: action.isActive,
        isAuthenticated: action.isAuthenticated
      };
    }
    case FETCH_USER_CREDENTIALS_FAIL:
    {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: action.payload
      };
    }
    case CLEAR_AUTHENTICATION_STATE:
    {
      return {
        ...initialState
      }
    }
    default:
      return state
  }
};

export const fetchUserCredentials = () => {
  return async(dispatch) => {
    dispatch({type: FETCH_USER_CREDENTIALS});
    try {
      const result = await axios.get('/auth');

      // if user is anonymous return a null object
      // {result: null} is due to reducer reading action.payload.result
      // which is the format in which normalizr formats objects
      const currentUser = result.data.is_authenticated ? normalize(result.data.user, user) : {result: null};

      dispatch({
        type: FETCH_USER_CREDENTIALS_SUCCESS,
        payload: currentUser,
        isAnonymous: result.data.is_anonymous,
        isActive: result.data.is_active,
        isAuthenticated: result.data.is_authenticated
        });

      // Set the current application mode
      // depending on user status
      if(result.data.is_anonymous) {
        dispatch(switchAppMode('public'));
      } else if (result.data.user.onboarded === false) {
        dispatch(switchAppMode('onboarding'));
      } else if (result.data.is_authenticated) {
        dispatch(switchAppMode('private'));
      }


    } catch (error) {
      dispatch({type: FETCH_USER_CREDENTIALS_FAIL, payload: error});
      console.error(error);
    }
  };
};

export const logoutUser = () => {
  return async(dispatch) => {
    dispatch({type: FETCH_USER_CREDENTIALS});
    try {
      await axios.get('/auth/logout');
      // if login successful -> change app mode
      await dispatch(switchAppMode('public'));
      dispatch({
        type: FETCH_USER_CREDENTIALS_SUCCESS,
        payload: {
          user: null,
          isAnonymous: true,
          isActive: false,
          isAuthenticated: false
        }
      });
    } catch (error) {
      dispatch({type: FETCH_USER_CREDENTIALS_FAIL, payload: error});
      console.error(error);
    }
  };
};



export const authorizeOauth2 = (provider) => {
  return async(dispatch) => {
    dispatch({type: FETCH_USER_CREDENTIALS});
    try {
      let result = await axios.get(`/auth/authorize/${provider}`);
      dispatch({
        type: FETCH_USER_CREDENTIALS_SUCCESS,
        payload: {
          user: result.data.user,
          isAnonymous: result.data.is_anonymous,
          isActive: result.data.is_active,
          isAuthenticated: result.data.is_authenticated
        }
      });
    } catch (error) {
      dispatch({type: FETCH_USER_CREDENTIALS_FAIL, payload: error});
      console.error(error);
    }
  };
};
