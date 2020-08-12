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

const user = new schema.Entity('users', {
  country: country,
  interests: [interest]
});

const recommendation = new schema.Entity('recommendation', {
  user: user
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
