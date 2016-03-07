import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, IterableDiffers} from 'angular2/core';
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
  template: TEMPLATE,
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TaskItem {
  differ: any;
  @Input() task: TaskMap;
  @Output() taskDeleted: EventEmitter<any> = new EventEmitter<any>();
  @Output() taskMarked: EventEmitter<any> = new EventEmitter<any>();
  @Output() taskEdit: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private _router: Router,
    differs: IterableDiffers
  ) {
    this.differ = differs.find([]).create(null);
  }

  ngOnInit() {
    console.log('task init', this.task.toJS())
  }

  ngDoCheck(differ: IterableDiffers) {
    var changes = this.differ.diff(this.list);
    if (changes) {
     // changes.forEachAddedItem(r => this.logs.push('added ' + r.item));
      changes.forEachRemovedItem(r => this.logs.push('removed ' + r.item))
    }
  }
 // ngOnChanges(x) {
   // console.log('task change',x)
  //}
  editItem(task) {
    this.taskEdit.emit(task.get('_id'));
  }

  deleteTask(task) {
    this.taskDeleted.emit(task);
  }

  markTask(task, newStatus) {
    this.taskMarked.emit({task, newStatus})
  }

  ngOnDestroy() {
    console.log('item destroy!',this.task.toJS());
  }

}
