export const TASKS_LOADED = 'TASKS_LOADED';
export const TASK_ADDED = 'TASK_ADDED';
export const TASK_DELETED = 'TASK_DELETED';
export const TASK_UPDATED = 'TASK_UPDATED';
export const TASK_MARKED = 'TASK_MARKED';

export function loadTasks() {
  return (dispatch, getState) => {
    dispatch({
      type: TASKS_LOADED,
      payload: getState().tasks
    });
  }
  
}

export function addTask(/* To Be Completed */) {
 
  return {
    type: 'TBC',
    payload: {}
  }
}

export function deleteTask(/* To Be Completed */) {
  return {
    type: 'TBC',
    payload: {}
  }
}

export function updateTask(/* To Be Completed */) {
  return {
    type: 'TBC',
    payload: {}
  }
}

export function markTask(/* TO BE COMPLETED*/) {
// NOTE: 'status' field is not implemented on the 
// API yet, so we can treat this as a synchernous action
  return {
    type: TASK_MARKED,
    payload: {
      /* To Be Completed */
    }
  };
}
