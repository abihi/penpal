import { authenticateUser } from './currentUser';
const axios = require('axios');
axios.defaults.withCredentials = true;

export const USER_LOGIN_INIT = 'login/USER_LOGIN_INIT';
export const USER_LOGIN_SUCCESS = 'login/USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAIL = 'login/USER_LOGIN_FAIL';


const initialState = {
  fetching: false,
  fetched: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_INIT:
    {
      return {
        ...state,
        fetching: true
      };
    }
    case USER_LOGIN_SUCCESS:
    {
      return {
        ...state,
        fetching: false,
        fetched: true,
      };
    }
    case USER_LOGIN_FAIL:
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

export const loginUser = (username='', password='', remember_me=true) => {
  return async(dispatch) => {
    dispatch({type: USER_LOGIN_INIT});
    try {
      // wait for HTTP request and state change
      await axios.post('/auth/login', {username, password, remember_me});
      await dispatch({type: USER_LOGIN_SUCCESS});
      // fetch user credentials
      await dispatch(authenticateUser());
    } catch (error) {
      dispatch({type: USER_LOGIN_FAIL, payload: error});
    }
  };
};
