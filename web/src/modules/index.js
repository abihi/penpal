import { combineReducers } from 'redux'
import auth from './auth';
import entities from './entities'
import mode from './mode';
import publicApp from './publicApp';
import onboardingApp from './onboardingApp';
import countries from './countries';
import interests from './interests';
import recommendations from './recommendations';
import users from './users';

export default combineReducers({
  auth,
  entities,
  publicApp,
  onboardingApp,
  mode,
  countries,
  interests,
  recommendations,
  users,
})
