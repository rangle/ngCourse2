import {Component, View} from 'angular2/core';
import Card from '../card/card';

@Component({
  selector: 'ngc-grid',
  inputs: [
    'tasks'
  ],
  directives: [Card],
  template: `
    <ul class="cols list-reset m0">
      <li class="py1 avoid-break"
        *ngFor="#task of tasks">
        <ngc-card [title]="task.owner"
          [content]="task.description">
        </ngc-card>
      </li>
    </ul>
  `
})
export default class Grid {
}
