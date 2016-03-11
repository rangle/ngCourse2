import TasksService, {Task, TaskMap} from '../services/tasks-service';
import StateService from '../services/state-service';
import {selectOwner}  from './filters';
import {Http} from 'angular2/http';
import {Injector, provide, Injectable} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Map} from 'immutable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/share';
export const TASKS_LOADED = 'TASKS_LOADED';
export const TASK_ADDED = 'TASK_ADDED';
export const TASK_DELETED = 'TASK_DELETED';
export const TASK_UPDATED = 'TASK_UPDATED';
export const TASK_MARKED = 'TASK_MARKED';
@Injectable()
export default class TaskActions {
  constructor(private tasksService:TasksService) {

  }

  loadTasks = () => {
    return (dispatch) => this.tasksService.fetch()
      .subscribe((res: Array<Task>) => {
        dispatch({
          type: TASKS_LOADED,
          payload: res
        });
      });
  }

  addTask = (task: Task) => {
    return (dispatch) => {


      const taskAdd$ = this.tasksService.add(task);

      taskAdd$
        .filter(res=> res.length === 1)
        .pluck(0)
        .subscribe(newTask=> {

          dispatch({
            type: TASK_ADDED,
            payload: newTask
          });

        });

      return taskAdd$;

    }
  }

  deleteTask = (task: TaskMap) => {
    return (dispatch) => {
      const taskDelete$ = this.tasksService.delete(task);
      taskDelete$
        .subscribe((res: number) => {
          dispatch({
            type: TASK_DELETED,
            payload: task.get('_id')
          });
        });

      return taskDelete$;
    }
  }

  markTask = (task: TaskMap, newStatus: boolean) => {
    return {
      type: TASK_MARKED,
      payload: {
        _id: task.get('_id'),
        newStatus: newStatus
      }
    };
  }


}
/*
const injector = Injector.resolveAndCreate([
  HTTP_PROVIDERS,
  provide('TasksService', { useClass: TasksService }),
  provide('StateService', { useClass: StateService})
]);

const Tasks = injector.get('TasksService');
const test = injector.get('StateService');

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

export function addTask(task: Task) {
  return (dispatch) => {


    const taskAdd$ = Tasks.add(task);

    taskAdd$
      .filter(res=> res.length === 1)
      .pluck(0)
      .subscribe(newTask=> {

        dispatch({
          type: TASK_ADDED,
          payload: newTask
        });

      });

    return taskAdd$;

  }
}

export function deleteTask(task: TaskMap) {
  return (dispatch) => {
    const taskDelete$ = Tasks.delete(task);
    taskDelete$
      .subscribe((res: number) => {
        dispatch({
          type: TASK_DELETED,
          payload: task.get('_id')
        });
      });

    return taskDelete$;
  }
}

export function updateTask(task: Task) {
  return (dispatch, getState) => {

    const taskUpdate$ = Tasks.update(task);

    taskUpdate$
      .filter(res=> res.length === 1)
      .pluck(0)
      .subscribe(updatedTask=> {

        const owner = task.owner;

        dispatch({
          type: TASK_UPDATED,
          payload: updatedTask
        });

        if (owner !== 'everyone') {
          dispatch(selectOwner(owner))
        };
      });

    return taskUpdate$
  }

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
*/
