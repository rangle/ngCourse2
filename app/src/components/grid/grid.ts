import {Component, View} from 'angular2/core';
import Card from '../card/card';

@Component({
  selector: 'grid',
  inputs: [
    'items'
  ],
  directives: [Card],
  template: `
    <ul class="cols list-reset m0">
      <li class="py1 avoid-break"
        *ngFor="#item of items">
        <card></card>
      </li>
    </ul>
  `
})
export default class Grid {
}
