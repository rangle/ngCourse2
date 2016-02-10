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
    case TASKS_LOADED:
      const tasks = fromJS(action.payload).map(task =>
        task.set('done', false)
      );
      return tasks;

    case TASK_ADDED:
      return state.push(Map(action.payload));

    case TASK_DELETED:
      const deleteIndex = state.findIndex((task: TaskMap) =>
        task.get('_id') === action.payload
      );
      return state.delete(deleteIndex); 

    case TASK_UPDATED:
      const updateIndex = state.findIndex((task: TaskMap) =>
        task.get('_id') === action.payload._id
      );
      return state.set(updateIndex, Map(action.payload)); 
    
    case TASK_MARKED:
      const markIndex = state.findIndex((task: TaskMap) =>
        task.get('_id') === action.payload._id
      );
      return state.update(markIndex, (task: TaskMap) => 
        task.set('done', action.payload.newStatus)
      ); 

    default:
      return state;
  }
}
