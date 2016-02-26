import {Component} from 'angular2/core';

@Component({
  selector: 'container',
  template: `<div class="container px2 mt2">
  <ng-content></ng-content>
  </div>`
})
export default class Container {

}
