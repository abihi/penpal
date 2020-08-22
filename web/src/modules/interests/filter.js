import {normalize} from 'normalizr'
import {interest} from '../entities';

export const SET_INTEREST_CLASS = 'filter/SET_INTEREST_CLASS';
export const SET_INTEREST_TYPE = 'filter/SET_INTEREST_TYPE';


const classes = Object.freeze({
    ALL:   Symbol("all"),
    GENERAL:  Symbol("general"),
    COLLECTION: Symbol("collection"),
    COMPETITIVE: Symbol("competitive")
});

const types = Object.freeze({
    ALL:   Symbol("all"),
    INDOORS:  Symbol("general"),
    OUTDOORS: Symbol("collection"),
    EDUCATIONAL: Symbol("educational")
});

const initialState = {
  interests: [],
  class: 'all',
  type: 'all',
  error: null,
};

const axios = require('axios');

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_INTEREST_CLASS:
    {
      // check if provided value doesn't exists in our Class enum
      // throw error if it doesn't exist among the list of interest classes
      if(!Object.values(classes).includes(action.payload))
        const error = new Error("Could not find the provided interest class among the list of interest classes");
        return {...state, error: error}


      return {
        ...state,
        class: action.payload
      };
    }
    case SET_INTEREST_TYPE:
    {
      // check if provided value doesn't exists in our Class enum
      // throw error if it doesn't exist among the list of interest classes
      if(!Object.values(types).includes(action.payload))
        const error = new Error("Could not find the provided interest class among the list of interest classes");
        return {...state, error: error}

      return {
        ...state,
        type: action.payload,
      };
    }
    default:
      return state
  }
};


export const setInterestFilterClass = (class=classes.ALL) => {
  return async(dispatch) => {
    dispatch({type: SET_INTEREST_CLASS, payload: class});
  };
};

export const setInterestFilterType = (type=types.ALL) => {
  return async(dispatch) => {
    dispatch({type: SET_INTEREST_TYPE, payload: type});
  };
};
