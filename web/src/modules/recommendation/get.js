import {normalize} from 'normalizr'
import {recommendation} from '../entities';
const axios = require('axios');
axios.defaults.withCredentials = true;

export const FETCH_RECOMMENDATIONS_INIT = 'recommendations/FETCH_RECOMMENDATIONS_INIT';
export const FETCH_RECOMMENDATIONS_SUCCESS = 'recommendations/FETCH_RECOMMENDATIONS_SUCCESS';
export const FETCH_RECOMMENDATIONS_FAIL = 'recommendations/FETCH_RECOMMENDATIONS_FAIL';


const initialState = {
  recommendations: [],
  fetching: false,
  fetched: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RECOMMENDATIONS_INIT:
    {
      return {
        ...state,
        fetching: true
      };
    }
    case FETCH_RECOMMENDATIONS_FAIL:
    {
      return {
        ...state,
        users: [...state.recommendations, action.payload.result],
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

export const getRecommendations = (id=null) => {
  return async(dispatch) => {
    dispatch({type: FETCH_USER_INIT});
    try {
      // wait for HTTP request and state change
      const result = await axios.get(`/recommendations/users`);
      // Normalize user object
      dispatch({type: FETCH_USER_SUCCESS, payload: normalize(result.data, user)});
    } catch (error) {
      dispatch({type: FETCH_USER_FAIL, payload: error});
      console.error(error);
    }
  };
};
