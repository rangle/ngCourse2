import { combineReducers } from 'redux';
import counter from './counter-reducer';
import curses from './curse-reducer';

export default  combineReducers({
  counter,
  curses
});

