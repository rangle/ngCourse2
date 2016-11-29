import {Component} from '@angular/core';

@Component({
	selector: 'hello',
	template: '<p>Hello {{name}}</p>'
})
export class HelloComponent {
  name: string;

  constructor() {
    this.name = 'World';
  }
}
