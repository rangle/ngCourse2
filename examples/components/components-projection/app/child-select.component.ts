import {Component} from '@angular/core';

@Component({
  selector: 'child-select',
  template: `
    <div style="border: 2px solid red; padding: 1rem; margin: 2px;">
	    <h4>Child Component with Select</h4>
	    <div style="border: 2px solid orange; padding: 1rem; margin: 2px">
	      <ng-content select="header"></ng-content>
	    </div>
	    <div style="border: 2px solid green; padding: 1rem; margin: 2px">
	      <ng-content select="section"></ng-content>
	    </div>
	    <div style="border: 2px solid pink; padding: 1rem; margin: 2px">
	      <ng-content select=".class-select"></ng-content>
	    </div>
	    <div style="border: 2px solid purple; padding: 1rem; margin: 2px">
	      <ng-content select="footer"></ng-content>
	    </div>
    </div>
  `
})
export class ChildSelect {
  
}