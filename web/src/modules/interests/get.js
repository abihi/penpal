import {normalize} from 'normalizr'
import {interest} from '../entities';

export const FETCH_INTERESTS = 'get/FETCH_INTERESTS';
export const FETCH_INTERESTS_SUCCESS = 'get/FETCH_INTERESTS_SUCCESS';
export const FETCH_INTERESTS_FAIL = 'get/FETCH_INTERESTS_FAIL';
export const SET_INTEREST_FILTER_SEARCHKEY = 'get/SET_INTEREST_FILTER_SEARCHKEY';
export const SET_INTEREST_FILTER_CLASS = 'get/SET_INTEREST_CLASS';
export const SET_INTEREST_FILTER_TYPE = 'get/SET_INTEREST_TYPE';

export const filterClasses = Object.freeze({
    ALL:   "all",
    GENERAL:  "general",
    COLLECTION: "collection",
    COMPETITIVE: "competitive"
});

export const filterTypes = Object.freeze({
    ALL:   "all",
    INDOORS:  "indoors",
    OUTDOORS: "outdoors",
    EDUCATIONAL: "educational"
});

const initialState = {
  interests: [],
  filtered: [],
  filterSearchkey: '',
  filterClass: 'all',
  filterType: 'all',
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
    case SET_INTEREST_FILTER_SEARCHKEY:
    {
      return {
        ...state,
        filterSearchkey: action.payload
      };
    }
    case SET_INTEREST_FILTER_CLASS:
    {
      // check if provided value doesn't exists in our Class enum
      // throw error if it doesn't exist among the list of interest classes
      if(!Object.values(filterClasses).includes(action.payload)){
        var error = new Error("Could not find the provided interest class among the list of interest classes");
        return {...state, error: error}
      }


      return {
        ...state,
        filterClass: action.payload
      };
    }
    case SET_INTEREST_FILTER_TYPE:
    {
      // check if provided value doesn't exists in our Class enum
      // throw error if it doesn't exist among the list of interest classes
      if(!Object.values(filterTypes).includes(action.payload)) {
        var error = new Error("Could not find the provided interest class among the list of interest classes");
        return {...state, error: error}
      }

      return {
        ...state,
        filterType: action.payload,
      };
    }
    default:
      return state
  }
};

export const setInterestFilterSearchkey = (searchkey='') => {
  return async(dispatch) => {
    dispatch({type: SET_INTEREST_FILTER_SEARCHKEY, payload: searchkey});
  };
};

export const setInterestFilterClass = (filterClass='') => {
  return async(dispatch) => {
    dispatch({type: SET_INTEREST_FILTER_CLASS, payload: filterClass});
  };
};

export const setInterestFilterType = (filterType='') => {
  return async(dispatch) => {
    dispatch({type: SET_INTEREST_FILTER_TYPE, payload: filterType});
  };
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

export const getAllInterests = () => {
  return async(dispatch) => {
    dispatch({type: FETCH_INTERESTS});
    try {
      const result = await axios.get('/interest');

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
