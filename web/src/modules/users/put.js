import {normalize, denormalize} from 'normalizr'
import {user} from '../entities';
const axios = require('axios');
axios.defaults.withCredentials = true;

export const UPDATE_CURRENT_USER = 'put/UPDATE_CURRENT_USER';

const initialState = {
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_USER:
    {
      return {
        ...state
      };
    }
    default:
      return state
  }
};


export const updateCurrentUser = (newCurrentUser) => {
  return async(dispatch) => {
    // Retrieve store in order to access current user
    const normalized = normalize(newCurrentUser, user);
    const id = normalized.result;
    const currentUser = normalized.entities.users[id];
    dispatch({type: UPDATE_CURRENT_USER, user: currentUser, id: id});
  };
};
