import { combineReducers } from 'redux'
import auth from './auth';
import login from './login';
import register from './register';

export default combineReducers({
  auth,
  login,
  register,
})
