import {Component, Input} from 'angular2/core';
import HelloComponent from './hello.component';

@Component({
	selector: 'app',
	template: `<div>
	    <hello-component [myName]="name"></hello-component>
	    <hello-component myName="Other World"></hello-component>
	  </div>`,
	directives: [HelloComponent]
})
export class App {
  name: string;
  
  constructor() {
    this.name = "World";
  }
}

