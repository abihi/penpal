import {normalize, denormalize} from 'normalizr'
import {interest} from '../entities';
export const FETCH_INTERESTS = 'get/FETCH_INTERESTS';
export const FETCH_INTERESTS_SUCCESS = 'get/FETCH_INTERESTS_SUCCESS';
export const FETCH_INTERESTS_FAIL = 'get/FETCH_INTERESTS_FAIL';
export const SET_INTEREST_FILTER_SEARCHKEY = 'get/SET_INTEREST_FILTER_SEARCHKEY';
export const SET_INTEREST_FILTER_CLASS = 'get/SET_INTEREST_CLASS';
export const SET_INTEREST_FILTER_TYPE = 'get/SET_INTEREST_TYPE';

export const filterClasses = Object.freeze({
    ALL: "All",
    GENERAL: "General",
    COLLECTION: "Collection",
    COMPETITIVE: "Competitive"
});

export const filterTypes = Object.freeze({
    ALL: "All",
    INDOORS: "Indoors",
    OUTDOORS: "Outdoors",
    EDUCATIONAL: "Educational"
});

const initialState = {
  interests: [],
  filtered: [],
  filterSearchkey: '',
  filterClass: 'All',
  filterType: 'All',
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
        filtered: action.payload.result
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
      // denormalize the interest entities to allow attribute comparisons
      const interests = [...denormalize(state.interests, [interest], action.entities)];
      // Set the filters to use wildcard for 'all' by converting the filter enum
      // to strings. The actual filter checks whether the filterClass includes the
      // specific filter values later
      const filterClass = state.filterClass === "All" ? JSON.stringify(filterClasses) : state.filterClass;
      const filterType = state.filterType === "All" ? JSON.stringify(filterTypes) : state.filterType;
      const filterString = action.payload;

      // filter list
      const filteredList = interests.filter(interest => {
      	return interest.activity.includes(filterString) && filterClass.includes(interest.interest_class) && filterType.includes(interest.interest_type);
      });

      // Create a list of id only
      const listOfId = filteredList.map(interest => interest.id);

      return {
        ...state,
        filterSearchkey: action.payload,
        filtered: listOfId
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

      // denormalize the interest entities to allow attribute comparisons
      const interests = [...denormalize(state.interests, [interest], action.entities)];
      // Set the filters to use wildcard for 'all' by converting the filter enum
      // to strings. The actual filter checks whether the filterClass includes the
      // specific filter values later
      const filterClass = action.payload === "All" ? JSON.stringify(filterClasses) : action.payload;
      const filterType = state.filterType === "All" ? JSON.stringify(filterTypes) : state.filterType;
      const filterString = state.filterSearchkey;

      // filter list
      const filteredList = interests.filter(interest => {
      	return interest.activity.includes(filterString) && filterClass.includes(interest.interest_class) && filterType.includes(interest.interest_type);
      });

      // Create a list of id only
      const listOfId = filteredList.map(interest => interest.id);

      return {
        ...state,
        filterClass: action.payload,
        filtered: listOfId
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

      // denormalize the interest entities to allow attribute comparisons
      const interests = [...denormalize(state.interests, [interest], action.entities)];
      // Set the filters to use wildcard for 'all' by converting the filter enum
      // to strings. The actual filter checks whether the filterClass includes the
      // specific filter values later
      const filterClass = state.filterClass === "All" ? JSON.stringify(filterClasses) : state.filterClass;
      const filterType = action.payload === "All" ? JSON.stringify(filterTypes) : action.payload;
      const filterString = state.filterSearchkey;

      // filter list
      const filteredList = interests.filter(interest => {
      	return interest.activity.includes(filterString) && filterClass.includes(interest.interest_class) && filterType.includes(interest.interest_type);
      });

      // Create a list of id only
      const listOfId = filteredList.map(interest => interest.id);

      return {
        ...state,
        filterType: action.payload,
        filtered: listOfId
      };
    }
    default:
      return state
  }
};

export const setInterestFilterSearchkey = (searchkey='') => {
  return async(dispatch, getState) => {
    const state = getState();
    dispatch({type: SET_INTEREST_FILTER_SEARCHKEY, payload: searchkey, entities: state.entities});
  };
};

export const setInterestFilterClass = (filterClass='') => {
  return async(dispatch, getState) => {
    const state = getState();
    dispatch({type: SET_INTEREST_FILTER_CLASS, payload: filterClass, entities: state.entities});
  };
};

export const setInterestFilterType = (filterType='') => {
  return async(dispatch, getState) => {
    const state = getState();
    dispatch({type: SET_INTEREST_FILTER_TYPE, payload: filterType, entities: state.entities});
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
