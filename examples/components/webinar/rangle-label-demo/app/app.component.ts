import { Component } from 'angular2/core';
import { RangleLabel }  from './rangle-label';

@Component({
	selector: 'hello',
	directives: [ RangleLabel ],
	template: `
	  <rangle-label [name]="labelText">
	  </rangle-label>
	`
})
export class App {
  private labelText = "Search the site";
}