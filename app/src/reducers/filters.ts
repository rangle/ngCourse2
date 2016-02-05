import {SELECT_OWNER, SELECT_STATUS} from '../actions/filters';
import {Map} from 'immutable';

const initialState = Map({
  owner: 'everyone',
  taskStatus: 'all' 
});

export default function filters(state = initialState, action) {
  switch (action.type) {
    case SELECT_OWNER:
      return state.set('owner', action.payload);

    case SELECT_STATUS:
      return state.set('taskStatus', action.payload);

    default:
      return state;
  }
}
