import {Component} from '@angular/core';

@Component({
	selector: 'app',
	template: `<div>
	    <hello [name]="helloName"></hello>
	    <hello name="Other World"></hello>
	  </div>`
})
export class AppComponent {
  helloName: string;

  constructor() {
    this.helloName = "World";
  }
}
