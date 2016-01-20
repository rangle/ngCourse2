import {Component} from 'angular2/core';
import UserIcon from '../icons/user';
const STYLES = require('./card.css').toString();

@Component({
  selector: 'ngc-card',
  inputs: [
    'title',
    'content'
  ],
  directives: [UserIcon],
  styles: [STYLES],
  template: `
    <div class="bg-white rounded shadow px2">
      <ng-content></ng-content>
    </div>
  `
})
export default class Card {
}
