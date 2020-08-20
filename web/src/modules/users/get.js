import {normalize} from 'normalizr'
import {user} from '../entities';
const axios = require('axios');
axios.defaults.withCredentials = true;

export const FETCH_USER_INIT = 'get/FETCH_USER_INIT';
export const FETCH_USER_SUCCESS = 'get/FETCH_USER_SUCCESS';
export const FETCH_USER_FAIL = 'get/FETCH_USER_FAIL';


const initialState = {
  users: [],
  fetching: false,
  fetched: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_INIT:
    {
      return {
        ...state,
        fetching: true
      };
    }
    case FETCH_USER_SUCCESS:
    {
      return {
        ...state,
        users: [...state.users, action.payload.result],
        fetching: false,
        fetched: true,
      };
    }
    case FETCH_USER_FAIL:
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

export const getUser = (id=null) => {
  return async(dispatch) => {
    dispatch({type: FETCH_USER_INIT});
    try {
      // wait for HTTP request and state change
      const result = await axios.get(`/user/${id}`);
      // Normalize user object
      dispatch({type: FETCH_USER_SUCCESS, payload: normalize(result.data, user)});
    } catch (error) {
      dispatch({type: FETCH_USER_FAIL, payload: error});
      console.error(error);
    }
  };
};
