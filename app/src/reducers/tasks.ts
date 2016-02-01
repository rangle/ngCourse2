import {
  LOAD_TASKS,
  ADD_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  MARK_TASK,
} from '../actions/tasks';
import {TaskMap} from '../services/tasks-service';
import {fromJS, List, Map} from 'immutable';

const initialState = List(); 

export default function tasks(state = initialState, action) {
  switch (action.type) {
    case LOAD_TASKS:
      const tasks = fromJS(action.payload).map(task =>
        task.set('done', false)
      );
      return tasks;

    case ADD_TASK:
      return state.push(Map(action.payload));

    case DELETE_TASK:
      const deleteIndex = state.findIndex((task: TaskMap) =>
        task.get('_id') === action.payload
      );
      return state.delete(deleteIndex); 

    case UPDATE_TASK:
      const updateIndex = state.findIndex((task: TaskMap) =>
        task.get('_id') === action.payload._id
      );
      return state.set(updateIndex, Map(action.payload)); 
    
    case MARK_TASK:
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
