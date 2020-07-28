const axios = require('axios');
axios.defaults.withCredentials = true;

export const USER_REGISTRATION_INIT = 'register/USER_REGISTRATION_INIT';
export const USER_REGISTRATION_SUCCESS = 'register/USER_REGISTRATION_SUCCESS';
export const USER_REGISTRATION_FAIL = 'register/USER_REGISTRATION_FAIL';


const initialState = {
  fetching: false,
  fetched: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTRATION_INIT:
    {
      return {
        ...state,
        fetching: true
      };
    }
    case USER_REGISTRATION_SUCCESS:
    {
      return {
        ...state,
        fetching: false,
        fetched: true,
      };
    }
    case USER_REGISTRATION_FAIL:
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

export const registerUser = (username = '', country='', email='', password='') => {
  return async(dispatch) => {
    dispatch({type: INIT_USER_LOGIN});
    try {
      // wait for HTTP request and state change
      await axios.post('/auth/register', {username, country, email, password});
      await dispatch({type: INIT_USER_LOGIN_SUCCESS});
      // fetch user credentials
      //await dispatch(fetchUserCredentials());
    } catch (error) {
      dispatch({type: INIT_USER_LOGIN_FAIL, payload: error});
    }
  };
};
