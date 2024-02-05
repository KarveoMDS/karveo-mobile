import {combineReducers} from 'redux';
import auth from './auth.reducer';
import events from './events.reducer';
import users from './users.reducer';
import school from './school.reducer';

export default combineReducers({
  auth,
  events,
  users,
  school,
});
