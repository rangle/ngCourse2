import {Component} from 'angular2/core';

const STYLES = require('./card.css').toString();

@Component({
  selector: 'ngc-card',
  styles: [STYLES],
  template: `
    <div class="bg-white rounded shadow px2">
      <ng-content></ng-content>
    </div>
  `
})
export default class Card {
}
