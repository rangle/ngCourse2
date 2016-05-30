import {Component} from '@angular/core';
import TasksService from '../../services/tasks-service';
import SummaryIcon from '../icons/summary';
import TaskFilters from '../task-filters/task-filters';
import {OwnersPipe, OwnerTasksPipe} from '../../pipes/owners';
import {SizePipe} from '../../pipes/size';

@Component({
  selector: 'ngc-summary',
  pipes: [OwnersPipe, OwnerTasksPipe, SizePipe],
  directives: [SummaryIcon, TaskFilters],
  template: `
  <p class="h3 mb2 p2">
    <ngc-icon-summary></ngc-icon-summary>
    Hello, Alice Beeblebrox. You own 
    <span class="blue">
      {{ tasksService.tasks | ownerTasks:'alice' | size }}
    </span>
    out of 
    <span class="orange">{{ tasksService.tasks.size }}</span>
    tasks.
  </p>
  <ngc-task-filters></ngc-task-filters>
  `
})
export default class Summary {

  constructor(
    public tasksService: TasksService
  ) {}

}
