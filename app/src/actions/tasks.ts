import TasksService, {Task, TaskMap} from '../services/tasks-service'; 
import * as FilterActions from './filters';
import {Http} from 'angular2/http';
import {Injector, provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Map} from 'immutable';

const injector = Injector.resolveAndCreate([
  HTTP_PROVIDERS,
  provide('TasksService', { useClass: TasksService })
]);

const Tasks = injector.get('TasksService');

export const TASKS_LOADED = 'TASKS_LOADED';
export const TASK_ADDED = 'TASK_ADDED';
export const TASK_DELETED = 'TASK_DELETED';
export const TASK_UPDATED = 'TASK_UPDATED';
export const TASK_MARKED = 'TASK_MARKED';

export function loadTasks() {
  return (dispatch) => Tasks.fetch()   
    .subscribe((res: Array<Task>) => { 
      dispatch({
        type: TASKS_LOADED,
        payload: res
      });
    });
}

export function addTask(/* To Be Completed */) {
 
  return (dispatch) => {
    return dispatch({
      type: TASK_ADDED,
      payload: {
        /* To Be Completed */
      }

      
    })
  }
}

export function deleteTask(task: TaskMap) {
  return (dispatch) => Tasks.delete(task)
    .subscribe((res: number) => {
      dispatch({
        type: TASK_DELETED,
        payload: task.get('_id')
      });
    });
}

export function updateTask(/* To Be Completed */) {
  return (dispatch, getState) => {
   dispatch({
     type: TASK_UPDATED,
     paylaod: {
       /* To Be Completed */
     }
   })
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
