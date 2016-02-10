import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import Grid from '../grid/grid';
import {StatusPipe} from '../../pipes/status';
import {OwnerTasksPipe} from '../../pipes/owners';

@Component({
  selector: 'ngc-tasks-list',
  pipes: [OwnerTasksPipe, StatusPipe],
  directives: [Grid],
  inputs: [
    'tasks',
    'owner',
    'taskStatus'
  ],
  template: `
    <ngc-grid [tasks]="tasks | ownerTasks:owner | status:taskStatus">
    </ngc-grid>
  `
})
export default class TasksList {}