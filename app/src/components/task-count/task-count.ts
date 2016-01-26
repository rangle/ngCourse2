import {Component} from 'angular2/core';
import {SizePipe} from '../../pipes/size';
import {OwnerTasksPipe} from '../../pipes/owners';

@Component({
  selector: 'ngc-task-count',
  inputs: [
    'tasks',
    'owner'
  ],
  pipes: [OwnerTasksPipe, SizePipe],
  template: `
    <span class="blue">
      {{ tasks | ownerTasks:owner | size }}
    </span>
  `
})
export default class TaskCount {}
