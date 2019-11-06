import { combineReducers } from 'redux';
import job from './job';
import company from './company';

const appReducer = combineReducers({
  job,
  company
});

export default appReducer;
