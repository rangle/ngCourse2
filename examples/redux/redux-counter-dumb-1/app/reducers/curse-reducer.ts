import { CAST_CURSE, REMOVE_CURSE } from '../actions/curse-actions';

export default function spells(state = 0, action) {
  
  switch (action.type) {
    case CAST_CURSE:
      return state + 1;
    case REMOVE_CURSE:
      return state - 1;
    default:
      return state;
  }
}