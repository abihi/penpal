import { combineReducers } from 'redux'
import currentUser from './currentUser';
import login from './login';
import logout from './logout';
import register from './register';

export default combineReducers({
  currentUser,
  login,
  logout,
  register,
})
