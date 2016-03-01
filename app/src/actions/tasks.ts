export const TASKS_LOADED = 'TASKS_LOADED';
export const TASK_ADDED = 'TASK_ADDED';
export const TASK_DELETED = 'TASK_DELETED';
export const TASK_UPDATED = 'TASK_UPDATED';
export const TASK_MARKED = 'TASK_MARKED';

export function loadTasks() {
  return {
    type: TASKS_LOADED,
    payload: {

    }
  }
}

export function addTask(task: any, onComplete: Function) {
  return {
    type: TASK_ADDED,
    payload: {

    }
  }
}

export function deleteTask(task: any) {
  return {
    type: TASK_DELETED,
    payload: { }
  }
}

export function updateTask(task: any, onComplete: Function) {
  return {
    type: TASK_UPDATED,
    payload: {}
  }
}

export function markTask(task: any, newStatus: boolean) {
  return {
    type: TASK_MARKED,
    payload: { }
  };
}
