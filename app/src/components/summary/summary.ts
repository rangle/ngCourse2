import {Component} from 'angular2/core';
import SummaryIcon from '../icons/summary';
import TasksService from '../../services/tasks-service';
import Dropdown from '../dropdown/dropdown'; 
import TaskCount from '../task-count/task-count';
import {OwnersPipe} from '../../pipes/owners';

@Component({
  selector: 'ngc-summary',
  inputs: [
    'tasksNumber',
  ],
  pipes: [OwnersPipe],
  directives: [SummaryIcon, Dropdown, TaskCount],
  template: `
  <p class="h3 mb4 p2 inline-block">
    <ngc-icon-summary></ngc-icon-summary>
    Hello, Alice Beeblebrox. You own 
    <ngc-task-count
      [tasks]="tasksService.tasks"
      [owner]="'alice'"> 
    </ngc-task-count>
    out of 
    <span class="orange">{{ tasksService.tasks.size }}</span>
    tasks.
  </p>
  <p class="h3 ml4 inline-block">
    <ngc-dropdown 
       class="mr1" 
       (change)="selectOwner($event)"
       [defaultValue]="'everyone'"
       [selected]="tasksService.owner"
       [items]="tasksService.tasks | owners">
    </ngc-dropdown>
    owns
    <ngc-task-count
      [tasks]="tasksService.tasks"
      [owner]="tasksService.owner"> 
    </ngc-task-count>
    .
  </p>
  `
})
export default class Summary {

  constructor(
    public tasksService: TasksService
  ) {
  }

  selectOwner(event: any) {
    const owner = event.target.value;
    this.tasksService.selectOwner(owner);
  }
}
