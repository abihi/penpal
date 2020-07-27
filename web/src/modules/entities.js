// schemas.js
import {schema} from 'normalizr';

const initialState = {
  users: [],
  countries: [],
};

const country = new schema.Entity('countries');
const user = new schema.Entity('users', {
  country: country,
});

export {
  country,
  user,
};


// Intercept state changes and look for changes in entities
export default (state = initialState, action) => {
  if (action.payload && action.payload.entities) {
    return {...state, ...action.payload.entities};
  }
  return state;
};
