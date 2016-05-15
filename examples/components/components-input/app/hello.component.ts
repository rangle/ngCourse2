import {Component} from '@angular/core';

@Component({
	selector: 'hello',
	inputs: ['name'],
	template: '<p>Hello, {{name}}!</p>',
})
export class Hello {
  name: string;
  
  constructor() {}
}
