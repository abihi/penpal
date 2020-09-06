import {normalize} from 'normalizr'
import {language} from '../entities';

export const FETCH_LANGUAGES = 'get/FETCH_LANGUAGES';
export const FETCH_LANGUAGES_SUCCESS = 'get/FETCH_LANGUAGES_SUCCESS';
export const FETCH_LANGUAGE_SUCCESS = 'get/FETCH_LANGUAGE_SUCCESS';
export const FETCH_LANGUAGES_FAIL = 'get/FETCH_LANGUAGES_FAIL';

const initialState = {
  languages: [],
  fetching: false,
  fetched: false,
  error: null
};

const axios = require('axios');

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LANGUAGES:
    {
      return {
        ...state,
        fetching: true
      };
    }
    case FETCH_LANGUAGES_SUCCESS:
    {
      return {
        ...state,
        fetching: false,
        fetched: true,
        languages: [...state.languages, ...action.payload.result],
      };
    }
    case FETCH_LANGUAGE_SUCCESS:
    {
      return {
        ...state,
        fetching: false,
        fetched: true,
        languages: [...state.languages, action.payload.result],
      };
    }
    case FETCH_LANGUAGES_FAIL:
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

export const getLanguages = () => {
  return async(dispatch) => {
    dispatch({type: FETCH_LANGUAGES});
    try {
      const result = await axios.get('/language/');

      dispatch({
        type: FETCH_LANGUAGES_SUCCESS,
        payload: normalize(result.data, [language]),
        });

    } catch (error) {
      dispatch({type: FETCH_LANGUAGES_FAIL, payload: error});
      console.error(error);
    }
  };
};

export const getLanguage = (id=null) => {
  return async(dispatch) => {
    dispatch({type: FETCH_LANGUAGES});
    try {
      const result = await axios.get(`/language/${id}`);

      dispatch({
        type: FETCH_LANGUAGE_SUCCESS,
        payload: normalize(result.data, language),
        });


    } catch (error) {
      dispatch({type: FETCH_LANGUAGES_FAIL, payload: error});
      console.error(error);
    }
  };
};
