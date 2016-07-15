import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {CheckIcon, CloseIcon, EditIcon, UserIcon} from '../icons';
import {Card, CardTitle, CardActions} from '../card';
import TasksService, {Task} from '../../services/tasks-service';
const TEMPLATE = require('./task-item.html');

@Component({
  selector: 'ngc-task',
  inputs: [
    'task'
  ],
  directives: [
    Card, 
    CardTitle, 
    CardActions, 
    CheckIcon, 
    CloseIcon, 
    EditIcon, 
    UserIcon
  ],
  template: TEMPLATE
})
export default class TaskItem {

  task: Task;

  constructor(
    private _tasksService: TasksService,
    private _router: Router
  ) {}

  editItem() {
    this._router.navigate(['tasks', this.task._id]);
  }

  deleteItem() {
    this._tasksService.delete(this.task);
  }

  mark(done: boolean): void {
    this._tasksService.updateStatus(this.task, done);
  }

}
