import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import Grid from '../grid/grid';
import {StatusPipe} from '../../pipes/status';
import TasksService from '../../services/tasks-service';
import {OwnerTasksPipe} from '../../pipes/owners';

@Component({
  selector: 'ngc-tasks-list',
  pipes: [OwnerTasksPipe, StatusPipe],
  directives: [Grid],
  template: `
    <ngc-grid 
      [tasks]="tasksService.tasks | 
      ownerTasks:tasksService.owner | 
      status:tasksService.taskStatus">
    </ngc-grid>
  `
})
export default class TasksList {

  constructor(
    public tasksService: TasksService
  ) {}

}
