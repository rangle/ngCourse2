import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {CheckIcon, CloseIcon, EditIcon, UserIcon} from '../icons';
import {Card, CardTitle, CardActions} from '../card';
import {TaskMap} from '../../services/tasks-service';
const TEMPLATE = require('./task-item.html');

@Component({
  selector: 'ngc-task',
  inputs: [
    'task',
    'deleteTask',
    'editTask', 
    'markTask'
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

  task: TaskMap;

  constructor(
    private _router: Router
  ) {}

  editItem() {
    this._router.navigate(['Main', 'TaskEdit', {id: this.task.get('_id')}]);
  }
}
