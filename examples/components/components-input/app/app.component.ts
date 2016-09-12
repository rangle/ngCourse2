import {Component} from '@angular/core';

@Component({
	selector: 'app',
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
