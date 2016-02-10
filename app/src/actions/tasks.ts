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

export function addTask(task: Task, onComplete: Function) {
  return (dispatch) => Tasks.add(task)
    .subscribe((res) => {
      if (res.length === 1) {
        dispatch({
          type: TASK_ADDED,
          payload: res[0]
        });
      }
    }, null, onComplete);
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

export function updateTask(task: Task, onComplete: Function) {
  return (dispatch, getState) => Tasks.update(task)
    .subscribe((res) => {
      if (res.length === 1) {
        const owner = getState().tasks.get('owner');

        dispatch({
          type: TASK_UPDATED, 
          payload: task
        });

        /* select the owner in case the owner name has been updated */
        if (owner !== 'everyone') {
          FilterActions.selectOwner(task.owner);
        }
      }
    }, null, onComplete);
}

export function markTask(task: TaskMap, newStatus: boolean) {
  return {
    type: TASK_MARKED,
    payload: {
      _id: task.get('_id'),
      newStatus: newStatus
    }
  };
}
