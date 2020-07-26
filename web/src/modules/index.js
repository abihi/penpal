import { combineReducers } from 'redux'
import publicApp from './publicApp';
import country from './country';

export default combineReducers({
  publicApp,
  country
})
