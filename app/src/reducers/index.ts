import { combineReducers } from 'redux';
import tasks from './tasks';
import filters from './filters';

export default  combineReducers({
  tasks,
  filters
});
