import {Component, Input, Output, EventEmitter, OnInit} from 'angular2/core';
import Dropdown from '../dropdown/dropdown';
import {SizePipe} from '../../pipes/size';
import {OwnersPipe, OwnerTasksPipe} from '../../pipes/owners';
import {List} from 'immutable';
const TEMPLATE = require('./task-filters.html');

@Component({
  selector: 'ngc-task-filters',
  pipes: [OwnersPipe, OwnerTasksPipe, SizePipe],
  directives: [Dropdown],
  template: TEMPLATE
})
export default class TaskFilters {

  @Input() tasks: List<Map<string, any>>;
  @Input() owner: string;
  @Input() owners: List<string>;
  @Input() taskStatus: string;
  @Output() ownerChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() taskStatusChanged: EventEmitter<string> = new EventEmitter<string>();
  statuses: List<string>;




  constructor() {
    this.statuses = List(['all', 'completed', 'incomplete']);
  }

  onSelectOwner($event) {
    const owner = $event.target.value;
    this.ownerChanged.emit(owner);
  }

  onSelectStatus($event) {
    const newStatus = $event.target.value;
    this.taskStatusChanged.emit(newStatus);
  }
}
