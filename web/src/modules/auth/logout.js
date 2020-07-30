import { clearAuthenticationState } from './currentUser';
import { switchAppMode } from '../mode';
const axios = require('axios');
axios.defaults.withCredentials = true;

export const USER_LOGOUT_INIT = 'logout/USER_LOGOUT_INIT';
export const USER_LOGOUT_SUCCESS = 'logout/USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAIL = 'logout/USER_LOGOUT_FAIL';


const initialState = {
  fetching: false,
  fetched: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGOUT_INIT:
    {
      return {
        ...state,
        fetching: true
      };
    }
    case USER_LOGOUT_SUCCESS:
    {
      return {
        ...state,
        fetching: false,
        fetched: true,
      };
    }
    case USER_LOGOUT_FAIL:
    {
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    }
    default:
      return state
  }
};

export const logoutUser = () => {
  return async(dispatch) => {
    dispatch({type: USER_LOGOUT_INIT});
    try {
      await axios.get('/auth/logout');
      // if login successful -> change app mode
      await dispatch(switchAppMode('public'));
      await dispatch({type: USER_LOGOUT_SUCCESS});
      dispatch(clearAuthenticationState());
    } catch (error) {
      dispatch({type: USER_LOGOUT_FAIL, payload: error});
      console.error(error);
    }
  };
};
