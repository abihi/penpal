import {normalize} from 'normalizr'
import {switchAppMode} from '../mode';
const axios = require('axios');
axios.defaults.withCredentials = true;

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

export const authenticateUser = () => {
  return async(dispatch) => {
    dispatch({type: FETCH_USER_CREDENTIALS});
    try {
      const result = await axios.get('/auth');

      dispatch({
        type: FETCH_USER_CREDENTIALS_SUCCESS,
        payload: result.data.current_user,
        isAnonymous: result.data.is_anonymous,
        isActive: result.data.is_active,
        isAuthenticated: result.data.is_authenticated
        });


      // Set the current application mode
      // depending on user status
      if(result.data.is_anonymous) {
        dispatch(switchAppMode('public'));
      } else if (result.data.current_user.onboarded === false) {
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

export const clearAuthenticationState = () => {
  return async(dispatch) => {
      dispatch({type: CLEAR_AUTHENTICATION_STATE});
  };
};