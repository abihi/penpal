import { combineReducers } from 'redux'
import auth from './auth';
import entities from './entities'
import mode from './mode';
import publicApp from './publicApp';
import countries from './countries';
import interests from './interests';
import users from './users';

export default combineReducers({
  auth,
  entities,
  publicApp,
  mode,
  countries,
  interests,
  users,
})
