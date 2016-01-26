import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import Grid from '../grid/grid';
import TasksService from '../../services/tasks-service';
import {OwnerTasksPipe} from '../../pipes/owners';

@Component({
  selector: 'ngc-tasks-list',
  pipes: [OwnerTasksPipe],
  directives: [Grid],
  template: `
    <ngc-grid 
      [tasks]="tasksService.tasks | ownerTasks:tasksService.owner">
    </ngc-grid>
  `
})
export default class TasksList {

  constructor(
    public tasksService: TasksService
  ) {
  }

}
