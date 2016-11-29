import {Component, Input} from '@angular/core';

@Component({
	selector: 'hello',
	template: '<p>Hello, {{name}}!</p>',
})
export class HelloComponent {
  @Input() name: string;

  constructor() {}
}
