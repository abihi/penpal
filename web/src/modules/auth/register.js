import { authenticateUser } from './currentUser';
const axios = require('axios');
axios.defaults.withCredentials = true;

export const USER_REGISTER_INIT = 'register/USER_REGISTER_INIT';
export const USER_REGISTER_SUCCESS = 'register/USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAIL = 'register/USER_REGISTER_FAIL';


const initialState = {
  fetching: false,
  fetched: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_INIT:
    {
      return {
        ...state,
        fetching: true
      };
    }
    case USER_REGISTER_SUCCESS:
    {
      return {
        ...state,
        fetching: false,
        fetched: true,
      };
    }
    case USER_REGISTER_FAIL:
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

export const registerUser = (username = '', country_id='', email='', password='') => {
  return async(dispatch) => {
    dispatch({type: USER_REGISTER_INIT});
    try {
      // wait for HTTP request and state change
      await axios.post('/auth/register', {username, country_id, email, password});
      await dispatch({type: USER_REGISTER_SUCCESS});
      // fetch user credentials
      await dispatch(authenticateUser());
    } catch (error) {
      dispatch({type: USER_REGISTER_FAIL, payload: error});
    }
  };
};
