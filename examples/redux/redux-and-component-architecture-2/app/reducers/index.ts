import { combineReducers } from 'redux';
import counter from './counter-reducer';
import curse from './curse-reducer';

export default  combineReducers({
  counter,
  curse
});

