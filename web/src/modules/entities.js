import { combineReducers } from 'redux'
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
  if(action.type === 'interests/UPDATE_USER_INTERESTS_INIT_SUCCESS') {
    const {interestId, userId, payload} = action;

    const currentUser = state.users[userId];
    let newCurrentUser = {...currentUser};

    if(payload === 'like') {
      newCurrentUser.interests.push(interestId);
    } else if (payload === 'unlike') {
      newCurrentUser.interests.splice(newCurrentUser.interests.indexOf(interestId), 1);
    }

    let newState = {...state};
    newState.users[userId] = newCurrentUser;
    return {
      ...newState
    };
  }

  if (action.payload && action.payload.entities) {
    // Temporary fix until BE implementation for image management is implemented
    if(action.payload.entities.interests) {
      Object.entries(action.payload.entities.interests).map(entry => {
        const interest = entry[1];
        interest.img = `https://snigel.s3.eu-north-1.amazonaws.com/interests/${interest.img}`;
      });
    }
    return {...state, ...action.payload.entities};
  }
  return state;
};
