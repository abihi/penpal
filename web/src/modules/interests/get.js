import {normalize} from 'normalizr'
import {interest} from '../entities';

export const FETCH_INTERESTS = 'get/FETCH_INTERESTS';
export const FETCH_INTERESTS_SUCCESS = 'get/FETCH_INTERESTS_SUCCESS';
export const FETCH_INTERESTS_FAIL = 'get/FETCH_INTERESTS_FAIL';

const initialState = {
  interests: [],
  fetching: false,
  fetched: false,
  error: null
};

const axios = require('axios');

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INTERESTS:
    {
      return {
        ...state,
        fetching: true
      };
    }
    case FETCH_INTERESTS_SUCCESS:
    {
      return {
        ...state,
        fetching: false,
        fetched: true,
        interests: action.payload.result,
      };
    }
    case FETCH_INTERESTS_FAIL:
    {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: action.payload,
      };
    }
    default:
      return state
  }
};

export const getInterest = (id=null) => {
  return async(dispatch) => {
    dispatch({type: FETCH_INTERESTS});
    try {
      const result = await axios.get(`/interest/${id}`);

      dispatch({
        type: FETCH_INTERESTS_SUCCESS,
        payload: normalize(result.data, [interest]),
        });


    } catch (error) {
      dispatch({type: FETCH_INTERESTS_FAIL, payload: error});
      console.error(error);
    }
  };
};

export const getInterests = (idList=[]) => {
  return async(dispatch) => {
    dispatch({type: FETCH_INTERESTS});
    try {
      const resultList = idList.map(async id => {
        const result = await axios.get(`/interest/${id}`);
        return result.data;
      });

      dispatch({
        type: FETCH_INTERESTS_SUCCESS,
        payload: normalize(resultList, [interest]),
        });

    } catch (error) {
      dispatch({type: FETCH_INTERESTS_FAIL, payload: error});
      console.error(error);
    }
  };
};
