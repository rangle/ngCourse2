import {Component} from 'angular2/core';
import {CheckIcon, CloseIcon, UserIcon} from '../icons';
import {Card, CardTitle, CardActions} from '../card';
import TasksService, {Task} from '../../services/tasks-service';
const TEMPLATE = require('./task-item.html');

@Component({
  selector: 'ngc-task',
  inputs: [
    'task'
  ],
  directives: [Card, CardTitle, CardActions, CheckIcon, CloseIcon, UserIcon],
  template: TEMPLATE
})
export default class TaskItem {

  public task: Task;

  constructor(
    private _tasksService: TasksService
  ) {}

  deleteItem() {
    this._tasksService.delete(this.task);
  }

}
