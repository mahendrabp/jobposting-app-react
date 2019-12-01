import { combineReducers } from 'redux';
import job from './job';
import company from './company';
import user from './user';

const appReducer = combineReducers({
  job,
  company,
  user
});

export default appReducer;
