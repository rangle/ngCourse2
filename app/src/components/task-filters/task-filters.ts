import {Component} from 'angular2/core';
import TasksService from '../../services/tasks-service';
import Dropdown from '../dropdown/dropdown'; 
import {SizePipe} from '../../pipes/size';
import {OwnersPipe, OwnerTasksPipe} from '../../pipes/owners';
import {List} from 'immutable';

@Component({
  selector: 'ngc-task-filters',
  directives: [Dropdown],
  pipes: [OwnersPipe, OwnerTasksPipe, SizePipe],
  template: `
    <div class="h4 ml2 mb4">
      <span>
        <ngc-dropdown 
           class="mr1" 
           (change)="selectOwner($event)"
           [defaultValue]="'everyone'"
           [selected]="tasksService.owner"
           [items]="tasksService.tasks | owners">
        </ngc-dropdown>
        owns
        <span class="blue">
          {{ tasksService.tasks | ownerTasks:tasksService.owner | size }}
        </span>
        .
      </span>
      <span class="ml2">
        Showing
        <ngc-dropdown
          class="ml1 mr1"
          (change)="selectStatus($event)"
          [items]="statuses"
          [selected]="tasksService.taskStatus">
        </ngc-dropdown>
        tasks.
      </span>
    </div>
  `
})
export default class TaskFilters {

  public statuses: List<string>; 

  constructor(
    public tasksService: TasksService
  ) {
    this.statuses = List(['all', 'completed', 'incomplete']);
  }

  selectOwner(event: any) {
    const owner = event.target.value;
    this.tasksService.selectOwner(owner);
  }

  selectStatus(event: any) {
    const newStatus = event.target.value;
    this.tasksService.selectStatus(newStatus);
  }
}
