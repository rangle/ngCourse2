import {Component, View, ChangeDetectionStrategy} from 'angular2/core';
import Task from '../task-item/task-item';

@Component({
  selector: 'ngc-grid',
  inputs: [
    'tasks'
  ],
  directives: [Task],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="cols list-reset m0">
      <li class="py1 avoid-break"
        *ngFor="#task of tasks">
        <ngc-task [task]="task">
        </ngc-task>
      </li>
    </ul>
  `
})
export default class Grid {
}
