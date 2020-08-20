import {normalize} from 'normalizr'
import {user} from '../entities';
const axios = require('axios');
axios.defaults.withCredentials = true;

export const UPDATE_USER_INTERESTS_INIT = 'interests/UPDATE_USER_INTERESTS_INIT';
export const UPDATE_USER_INTERESTS_INIT_SUCCESS = 'interests/UPDATE_USER_INTERESTS_INIT_SUCCESS';
export const UPDATE_USER_INTERESTS_INIT_FAIL = 'interests/UPDATE_USER_INTERESTS_INIT_FAIL';


const initialState = {
  updating: false,
  updated: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_INTERESTS_INIT:
    {
      return {
        ...state,
        updating: true
      };
    }
    case UPDATE_USER_INTERESTS_INIT_SUCCESS:
    {
      return {
        ...state,
        updating: false,
        updated: true,
      };
    }
    case UPDATE_USER_INTERESTS_INIT_FAIL:
    {
      return {
        ...state,
        updating: false,
        error: action.payload
      };
    }
    default:
      return state
  }
};

export const likeInterest = (interestId=null) => {
  return async(dispatch, getState) => {
    dispatch({type: UPDATE_USER_INTERESTS_INIT});
    try {
      // Retrieve store in order to access current user
      const store = getState();
      const currentUser = denormalize(store.auth.currentUser, user, store.entities);
      // Post request to add the interest to current users liked interests
      // wait for HTTP request and state change
      const result = await axios.post(`/user/interests/${interestId}`);
      
      dispatch({type: UPDATE_USER_INTERESTS_INIT_SUCCESS});
    } catch (error) {
      dispatch({type: UPDATE_USER_INTERESTS_INIT_FAIL, payload: error});
      console.error(error);
    }
  };
};
