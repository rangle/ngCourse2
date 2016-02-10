import {Component} from 'angular2/core';
import Dropdown from '../dropdown/dropdown'; 
import {SizePipe} from '../../pipes/size';
import {OwnersPipe, OwnerTasksPipe} from '../../pipes/owners';
import {List} from 'immutable';
const TEMPLATE = require('./task-filters.html');

@Component({
  selector: 'ngc-task-filters',
  pipes: [OwnersPipe, OwnerTasksPipe, SizePipe],
  directives: [Dropdown],
  inputs: [
    'tasks',
    'owner',
    'taskStatus',
    'selectOwner',
    'selectStatus'
  ],
  template: TEMPLATE
})
export default class TaskFilters {

  statuses: List<string>; 
  selectOwner: Function;
  selectStatus: Function;

  constructor() {
    this.statuses = List(['all', 'completed', 'incomplete']);
  }

  onSelectOwner($event) {
    const owner = $event.target.value;
    this.selectOwner(owner);
  }

  onSelectStatus($event) {
    const newStatus = $event.target.value;
    this.selectStatus(newStatus);
  }
}