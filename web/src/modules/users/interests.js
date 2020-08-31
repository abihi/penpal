import {normalize, denormalize} from 'normalizr'
import {user} from '../entities';
import {updateCurrentUser} from './put'
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
      const currentUser = denormalize(store.auth.currentUser.id, user, store.entities);
      // Post request to add the interest to current users liked interests
      // wait for HTTP request and state change
      const result = await axios.put(`/user/${currentUser.id}/interest/like`, {interest_id: interestId});

      //let newCurrentUser = {...currentUser};
      //newCurrentUser.interests.concat(interestId);
      //await dispatch(updateCurrentUser(newCurrentUser));

      dispatch({type: UPDATE_USER_INTERESTS_INIT_SUCCESS, payload: 'like', interestId: interestId, userId: currentUser.id});
    } catch (error) {
      dispatch({type: UPDATE_USER_INTERESTS_INIT_FAIL, payload: error});
      console.error(error);
    }
  };
};

export const unlikeInterest = (interestId=null) => {
  return async(dispatch, getState) => {
    dispatch({type: UPDATE_USER_INTERESTS_INIT});
    try {
      // Retrieve store in order to access current user
      const store = getState();
      const currentUser = denormalize(store.auth.currentUser.id, user, store.entities);
      // Post request to add the interest to current users liked interests
      // wait for HTTP request and state change
      const result = await axios.put(`/user/${currentUser.id}/interest/unlike`, {interest_id: interestId});

      //let newCurrentUser = {...currentUser};
      //interests.filter(interest => interest.id != interestId);
      //await dispatch(updateCurrentUser(newCurrentUser));

      dispatch({type: UPDATE_USER_INTERESTS_INIT_SUCCESS, payload: 'unlike', interestId: interestId, userId: currentUser.id});
    } catch (error) {
      dispatch({type: UPDATE_USER_INTERESTS_INIT_FAIL, payload: error});
      console.error(error);
    }
  };
};
