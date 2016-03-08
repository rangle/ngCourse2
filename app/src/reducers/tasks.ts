import {
TASKS_LOADED,
TASK_ADDED,
TASK_DELETED,
TASK_UPDATED,
TASK_MARKED,
} from '../actions/tasks';

import {fromJS, List, Map} from 'immutable';

const initialState = fromJS([{
  '_id': '56cde4d081ed8e03002589d6',
  'owner': 'Alice',
  'description': 'Task 1',
  '__v': 0
}, {
    '_id': '56cf6670c04ba2030005ba03',
    'owner': 'Alice',
    'description': 'Task 2',
    '__v': 0
  }, {
    '_id': '56cf7cd0c04ba2030005ba04',
    'owner': 'Bob',
    'description': 'Task 3',
    '__v': 0
  }, {
    '_id': '56d46f7a7afdec030058f6e3',
    'owner': 'bob',
    'description': 'Task 4',
    '__v': 0
  }]);

export default function tasks(state = initialState, action) {
  switch (action.type) {
    case TASKS_LOADED:
      return state;
    case TASK_ADDED:
      return state.push(fromJS(action.payload))
     case TASK_UPDATED:
      const updateIndex = state.findIndex((task: Map<string,any>) =>
        task.get('_id') === action.payload._id
      );
      return state.set(updateIndex, Map(action.payload)); 
     case TASK_DELETED:
       const deleteIndex = state.findIndex((task: Map<string, any>) =>
         task.get('_id') === action.payload
       );
       return state.delete(deleteIndex);
     case TASK_MARKED:
      let { taskId, newStatus } = action.payload;

      const markIndex = state.findIndex((task: Map<string, any>) =>
         task.get('_id') ===  taskId
       );
      return state.update(markIndex, (task: Map<string, any>) =>
         task.set('done', newStatus)
       ); 

    default:
      return state;
  }
}
