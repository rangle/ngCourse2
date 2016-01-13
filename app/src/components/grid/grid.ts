import {Component, View} from 'angular2/core';
import Card from '../card/card';

@Component({
  selector: 'grid',
  inputs: [
    'tasks'
  ],
  directives: [Card],
  template: `
    <ul class="cols list-reset m0">
      <li class="py1 avoid-break"
        *ngFor="#task of tasks">
        <card [title]="task.owner"
          [content]="task.description"></card>
      </li>
    </ul>
  `
})
export default class Grid {
}
