import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
	  <app-hello-list>
	    <app-hello name="World"></app-hello>
	    <app-hello name="Other World"></app-hello>
	    <app-hello #last name="Last World"></app-hello>
	  </app-hello-list>
	  <p>Calls function on child component classes to randomize color of them.</p>`
})
export class AppComponent {
  constructor() {}
}
