// schemas.js
import {schema} from 'normalizr';

const initialState = {
  users: [],
  countries: [],
  interests: [],
  languages: [],
  recommendations: [],
};

const country = new schema.Entity('countries');
const interest = new schema.Entity('interests');
const language = new schema.Entity('languages');

const user = new schema.Entity('users', {
  country: country,
  interests: [interest],
  languages: [language]
});

const recommendation = new schema.Entity('recommendations', {
  user: user
});

export {
  country,
  interest,
  language,
  user,
  recommendation
};


// Intercept state changes and look for changes in entities
export default (state = initialState, action) => {
  if (action.payload && action.payload.entities) {
    return {...state, ...action.payload.entities};
  }
  return state;
};
