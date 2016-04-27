import { Component, ViewEncapsulation } from 'angular2/core';

@Component({
  selector: 'app',
  template: `<p>P inside a component</p>`,
  styles: [ 'p { background: red }' ],
  //encapsulation: ViewEncapsulation.Emulated
})
export class App {}
