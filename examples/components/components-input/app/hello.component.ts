import {Component, Input} from 'angular2/core';

@Component({
	selector: 'hello-component',
	template: '<p>Hello, {{myName}}!</p>',
	inputs: ['myName']
})
export default class HelloComponent {
  myName: string;
  
  constructor() {}
}
