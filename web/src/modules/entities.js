// schemas.js
import {schema} from 'normalizr';

const initialState = {
  users: [],
  countries: [],
  interests: [],
  recommendation: [],
};

const country = new schema.Entity('countries');
const interest = new schema.Entity('interests');
const recommendation = new schema.Entity('recommendation', {
  user: user
});

const user = new schema.Entity('users', {
  country: country,
  interests: [interest]
});

export {
  country,
  interest,
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
