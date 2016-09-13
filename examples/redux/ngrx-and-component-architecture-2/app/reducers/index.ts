import { combineReducers } from '@ngrx/store';
import { counterReducer } from './counter-reducer';
import { curseReducer } from './curse-reducer';

export default combineReducers({
  counter: counterReducer,
  curse: curseReducer
});
