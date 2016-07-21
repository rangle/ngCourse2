import { ActionReducer, Action } from '@ngrx/store';
import { CAST_CURSE, REMOVE_CURSE } from '../actions/curse-actions';

export const curseReducer: ActionReducer = (state = 0, action: Action) => {
  
  switch (action.type) {
    case CAST_CURSE:
      return state + 1;
    case REMOVE_CURSE:
      return state - 1;
    default:
      return state;
  }
}
