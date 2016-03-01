import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Router} from 'angular2/router';
import {CheckIcon, CloseIcon, EditIcon, UserIcon} from '../icons';
import {Card, CardTitle, CardActions} from '../card';
import {TaskMap} from '../../services/tasks-service';
const TEMPLATE = require('./task-item.html');

@Component({
  selector: 'ngc-task',

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

  @Input() task: TaskMap;
  @Output() taskDeleted: EventEmitter<any> = new EventEmitter<any>();
  @Output() taskMarked: EventEmitter<any> = new EventEmitter<any>();
  @Output() taskEdit: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private _router: Router
  ) { }

  editItem(task) {
    this.taskEdit.emit(task.get('_id'));
  }

  deleteTask(task) {
    this.taskDeleted.emit(task);
  }

  markTask(task, newStatus) {
    this.taskMarked.emit({ task, newStatus })
  }

}
