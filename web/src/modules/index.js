import { combineReducers } from 'redux'
import auth from './auth';
import entities from './entities'
import mode from './mode';
import publicApp from './publicApp';
import country from './country';
import user from './user';

export default combineReducers({
  auth,
  entities,
  publicApp,
  mode,
  country,
  user,
})
