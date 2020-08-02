import {normalize} from 'normalizr'
import {country} from '../entities';

export const FETCH_COUNTRIES = 'get/FETCH_COUNTRIES';
export const FETCH_COUNTRIES_SUCCESS = 'get/FETCH_COUNTRIES_SUCCESS';
export const FETCH_COUNTRIES_FAIL = 'get/FETCH_COUNTRIES_FAIL';

const initialState = {
  countries: [],
  fetching: false,
  fetched: false,
  error: null
};

const axios = require('axios');

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNTRIES:
    {
      return {
        ...state,
        fetching: true
      };
    }
    case FETCH_COUNTRIES_SUCCESS:
    {
      return {
        ...state,
        fetching: false,
        fetched: true,
        countries: action.payload.result,
      };
    }
    case FETCH_COUNTRIES_FAIL:
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

export const getCountries = () => {
  return async(dispatch) => {
    dispatch({type: FETCH_COUNTRIES});
    try {
      const result = await axios.get('/country/');

      dispatch({
        type: FETCH_COUNTRIES_SUCCESS,
        payload: normalize(result.data, [country]),
        });


    } catch (error) {
      dispatch({type: FETCH_COUNTRIES_FAIL, payload: error});
      console.error(error);
    }
  };
};
