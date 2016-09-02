import {Component} from '@angular/core';

@Component({
	selector: 'app',
	template: `
	  <hello-list>
	    <hello name="World"></hello>
	    <hello name="Other World"></hello>
	    <hello #last name="Last World"></hello>
	  </hello-list>
	  <p>Calls function on child component classes to randomize color of them.</p>`
})
export class App {
  constructor() {}
}
