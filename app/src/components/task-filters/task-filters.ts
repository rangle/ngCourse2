import {Component} from 'angular2/core';
import TasksService from '../../services/tasks-service';
import Dropdown from '../dropdown/dropdown'; 
import {SizePipe} from '../../pipes/size';
import {OwnersPipe, OwnerTasksPipe} from '../../pipes/owners';
import {List} from 'immutable';
const TEMPLATE = require('./task-filters.html');

@Component({
  selector: 'ngc-task-filters',
  directives: [Dropdown],
  pipes: [OwnersPipe, OwnerTasksPipe, SizePipe],
  template: TEMPLATE
})
export default class TaskFilters {

  statuses: List<string>; 

  constructor(
    public tasksService: TasksService
  ) {
    this.statuses = List(['all', 'completed', 'incomplete']);
  }

  selectOwner($event) {
    const owner = $event.target.value;
    this.tasksService.selectOwner(owner);
  }

  selectStatus($event) {
    const newStatus = $event.target.value;
    this.tasksService.selectStatus(newStatus);
  }
}
