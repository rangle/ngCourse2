import {Component} from '@angular/core';
import {Hello} from './hello.component';

@Component({
	selector: 'app',
	directives: [Hello],
	template: `<div>
	    <hello [name]="helloName"></hello>
	    <hello name="Other World"></hello>
	  </div>`
})
export class App {
  helloName: string;
  
  constructor() {
    this.helloName = "World";
  }
}
