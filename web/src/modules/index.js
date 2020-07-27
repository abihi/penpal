import { combineReducers } from 'redux'
import entities from './entities'
import publicApp from './publicApp';
import country from './country';

export default combineReducers({
  entities,
  publicApp,
  country
})
