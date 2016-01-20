import {Component} from 'angular2/core';
import SummaryIcon from '../icons/summary';

@Component({
  selector: 'ngc-summary',
  directives: [SummaryIcon],
  template: `
  <p class="h3 mb4 p2">
    <ngc-icon-summary></ngc-icon-summary>
    Hello, Alice Beeblebrox. You have 23 tasks.
  </p>
  `
})
export default class Summary {}
