import {
  TASKS_LOADED,
  TASK_ADDED,
  TASK_DELETED,
  TASK_UPDATED,
  TASK_MARKED,
} from '../actions/tasks';
import {TaskMap} from '../services/tasks-service';
import {fromJS, List, Map} from 'immutable';

const initialState = List(); 

export default function tasks(state = initialState, action) {
  switch (action.type) {
   
    default:
      return state;
  }
}
