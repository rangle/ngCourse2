import {Component} from '@angular/core';

@Component({
	selector: 'child',
	template: `
	  <div style="border: 2px solid blue; padding: 1rem; margin: 2px;">
	    <h4>Child Component</h4>
	    <ng-content></ng-content>
    </div>
	`
})
export class Child {
  childCount: number = 24;
}