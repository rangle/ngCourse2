import {Component} from 'angular2/core';

@Component({
	selector: 'hello',
	template: '<p>Hello {{name}}</p>'
})
export class Hello {
  name: string;
  constructor() {
    this.name = 'World';
  }
}