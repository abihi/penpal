// schemas.js
import {schema} from 'normalizr';

const initialState = {
  users: [],
  countries: [],
  interests: [],
  languages: [],
  recommendations: [],
};

const section = new schema.Entity('sections')
const sections = new schema.Array(section);
section.define({ sections });
const menu = new schema.Entity('menu', { sections });


const country = new schema.Entity('countries');
const interest = new schema.Entity('interests');
const language = new schema.Entity('languages');
const penpal = new schema.Entity('penpals');

const user = new schema.Entity('users', {
  country: country,
  interests: [interest],
  languages: [language],
  penpals: [this]
});
// to allow for self referencing
const penpals = new schema.Array(user);
user.define({ penpals });



const recommendation = new schema.Entity('recommendations', {
  user: user
});

export {
  country,
  interest,
  language,
  penpal,
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
