import { combineReducers } from 'redux'
import entities from './entities'
import publicApp from './publicApp';
import country from './country';
import user from './user';

export default combineReducers({
  entities,
  publicApp,
  country,
  user,
})
