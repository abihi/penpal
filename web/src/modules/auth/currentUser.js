import {switchAppMode} from '../mode';
import {getUser} from '../users/get';
import {denormalize} from 'normalizr';
import {user} from '../../modules/entities';
const axios = require('axios');
axios.defaults.withCredentials = true;

export const FETCH_USER_CREDENTIALS = 'auth/FETCH_USER_CREDENTIALS';
export const FETCH_USER_CREDENTIALS_SUCCESS = 'auth/FETCH_USER_CREDENTIALS_SUCCESS';
export const FETCH_USER_CREDENTIALS_FAIL = 'auth/FETCH_USER_CREDENTIALS_FAIL';
export const CLEAR_AUTHENTICATION_STATE = 'auth/CLEAR_AUTHENTICATION_STATE';

const initialState = {
  id: null,
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
        id: action.currentUser,
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
  return async(dispatch, getState) => {
    dispatch({type: FETCH_USER_CREDENTIALS});
    try {
      // Back end only returns id of current user
      const result = await axios.get('/auth');

      // Store auth details and current user id in state
      dispatch({
        type: FETCH_USER_CREDENTIALS_SUCCESS,
        currentUser: result.data.current_user,
        isAnonymous: result.data.is_anonymous,
        isActive: result.data.is_active,
        isAuthenticated: result.data.is_authenticated
        });

      // Early exit function if user is anonomyous
      if(result.data.is_anonymous)
        return;

      // Get user object if since user is not anonymous
      // getUser function normalizes the user before storing its data
      await dispatch(getUser(result.data.current_user));

      // Access the store and denormalize the currentUser from stored entities
      const store = getState();
      const currentUser = denormalize(store.auth.currentUser, user, store.entities);

      const CURRENT_USER_IS_ANONYMOUS = result.data.is_anonymous;
      const CURRENT_USER_IS_AUTHENTICATED = result.data.is_authenticated;
      const CURRENT_USER_IS_ONBOARDED = currentUser.onboarded;



      // Set the current application mode
      // depending on user status
      if(CURRENT_USER_IS_ANONYMOUS) {
        dispatch(switchAppMode('public'));
      } else if (!CURRENT_USER_IS_ONBOARDED) {
        dispatch(switchAppMode('onboarding'));
      } else if (CURRENT_USER_IS_AUTHENTICATED) {
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
