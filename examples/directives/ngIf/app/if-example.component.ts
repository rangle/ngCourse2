import {Component} from '@angular/core';

@Component({
  selector: 'if-example',
  template: `<ng-content></ng-content>`
})
export class IfExampleComponent {
  constructor() {
    console.log('example constructed');
  }
}