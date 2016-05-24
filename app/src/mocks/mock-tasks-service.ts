import {provide} from '@angular/core';
import TasksService, {Task} from '../services/tasks-service';
import {List} from 'immutable';

const MockTasksList = List([
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
const RESPONSE_TIME = 1000;

export class MockTasksService {
  private _tasks: List<Task> = MockTasksList;
  private _owner = 'everyone';
  private _taskStatus = 'all';

  constructor() {
  }

  fetch() {}

  getById(id: string) {
    const index = this._tasks.findIndex((t) => t._id === id);
    return this._tasks.get(index);
  }

  add(task: Task) {
    task._id = '4';
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

  getProvider(): any {
    return provide(TasksService, {useValue: this});
  }

  static getProvider(): any {
    return provide(TasksService, {useClass: MockTasksService});
  }
}
