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

export function addTask(task: any) {
 
  return {
    type: TASK_ADDED,
    payload: task
  }
}

export function deleteTask(taskId) {
  return {
    type: TASK_DELETED,
    payload: taskId
  }
}

export function updateTask(task) {
  return {
    type: TASK_UPDATED,
    payload: task
  }
}

export function markTask(taskId, newStatus) {
// NOTE: 'status' field is not implemented on the 
// API yet, so we can treat this as a synchernous action
  return {
    type: TASK_MARKED,
    payload: { taskId, newStatus }
  };
}
