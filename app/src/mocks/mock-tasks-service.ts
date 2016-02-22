import {provide} from 'angular2/core';
import {SpyObject} from 'angular2/testing_internal';
import TasksService, {Task} from '../services/tasks-service';
import {List} from 'immutable';

export class MockTasksService extends SpyObject {
  private _tasks: List<Task> = List([
    {
      done: false,
      owner: 'a',
      description: 'task 1',
      _id: '1'
    }, {
      done: false,
      owner: 'a',
      description: 'task 2',
      _id: '2'
    }, {
      done: false,
      owner: "a",
      description: 'task 3',
      _id: '3'
    }
  ]);
  private _owner = 'everyone';
  private _taskStatus = 'all';

  constructor() {
    super(TasksService);
  }

  fetch() {}

  getById(id: string) {
    const index = this._tasks.findIndex((t) => t._id === id);
    return this._tasks.get(index);
  }

  add(task: Task) {
    this._tasks = this._tasks.push(task);
  }

  delete(task: Task) {
    const index = this._tasks.findIndex((t) => t._id === task._id);
    this._tasks = this._tasks.delete(index);
  }

  updateStatus(task: Task, done: boolean) {
    const index = this._tasks.findIndex((t) => t._id === task._id);

    const updatedTask = {
      done: done,
      owner: task.owner,
      description: task.description,
      _id: task._id
    };

    this._tasks = this._tasks.set(index, updatedTask);
  }

  update(task: Task) {
    const index = this._tasks.findIndex((t) => t._id === task._id);

    this._tasks = this._tasks.set(index, task);

    if (this._owner !== 'everyone') {
      this.selectOwner(task.owner);
    }
  }

  selectOwner(owner) {
    this._owner = owner;
  }

  selectStatus(taskStatus) {
    this._taskStatus = taskStatus;
  }

  goToTasksList() {}

  get tasks() {
    return this._tasks;
  }

  get owner() {
    return this._owner;
  }

  get taskStatus() {
    return this._taskStatus;
  }

  static getProvider(): any {
    return provide(TasksService, {useClass: MockTasksService});
  }

}
