import {Component} from '@angular/core';
import {Hello} from './hello.component';
import {HelloList} from './hello-list.component';

@Component({
	selector: 'app',
	directives: [Hello, HelloList],
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
