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

export const LOAD_TASKS = 'LOAD_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const MARK_TASK = 'MARK_TASK';

export function loadTasks() {
  return (dispatch) => Tasks.fetch()   
    .subscribe((res: Array<Task>) => { 
      dispatch({
        type: LOAD_TASKS,
        payload: res
      });
    });
}

export function addTask(task: Task, onComplete: Function) {
  return (dispatch) => Tasks.add(task)
    .subscribe((res) => {
      if (res.length === 1) {
        dispatch({
          type: ADD_TASK,
          payload: res[0]
        });
      }
    }, null, onComplete);
}

export function deleteTask(task: TaskMap) {
  return (dispatch) => Tasks.delete(task)
    .subscribe((res: number) => {
      dispatch({
        type: DELETE_TASK,
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
          type: UPDATE_TASK, 
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
    type: MARK_TASK,
    payload: {
      _id: task.get('_id'),
      newStatus: newStatus
    }
  };
}
