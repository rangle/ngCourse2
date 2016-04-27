import { Component } from 'angular2/core';
import { RangleButton }  from './rangle-button';

@Component({
	selector: 'app',
	directives: [ RangleButton ],
	template: `
	  <rangle-button
	    [name]="buttonText"
	    [isPrimary]="true"
	    (onClick)="handleClick()">
	  </rangle-button>
	`
})
export class App {
  private buttonText = "Search";

  handleClick() {
    alert('The button was clicked');
  }
}
