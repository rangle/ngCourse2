import {Component} from 'angular2/core';

@Component({
  selector: 'sample',
  template: `
  <div class="overflow-hidden border rounded">
  <div class="p2 bold white bg-blue">
    <ng-content select="header"></ng-content>
  </div>
  <div class="p2">
    <ng-content select="section"></ng-content>
  </div>
  <div class="p2 bg-silver">
    <ng-content select="footer"></ng-content>
  </div>
</div>
  `
})
export default class Sample {

}
