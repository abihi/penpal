export const FETCH_COUNTRIES = 'list/FETCH_COUNTRIES';
export const FETCH_COUNTRIES_SUCCESS = 'list/FETCH_COUNTRIES_SUCCESS';
export const FETCH_COUNTRIES_FAIL = 'list/FETCH_COUNTRIES_FAIL';

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
        countries: action.payload,
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

export const fetchUserCredentials = () => {
  return async(dispatch) => {
    dispatch({type: FETCH_USER_CREDENTIALS});
    try {
      const result = await axios.get('/auth');

      const countries = result.data;

      dispatch({
        type: FETCH_USER_CREDENTIALS_SUCCESS,
        payload: countries,
        });


    } catch (error) {
      dispatch({type: FETCH_COUNTRIES_FAIL, payload: error});
      console.error(error);
    }
  };
};
