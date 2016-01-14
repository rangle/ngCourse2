import {Component, Input} from 'angular2/core';

@Component({
  selector: 'a2-projection',
  template: `
  <p>
  Angular 2 Outer Component (Top)
  <ng-content></ng-content>
  Angular 2 Outer Component (Bottom)
  </p>
  `
})
export class A2Projection { }