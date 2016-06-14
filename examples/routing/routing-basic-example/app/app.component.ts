import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import ComponentOne from './component-one';
import ComponentTwo from './component-two';


@Component({
	selector: 'simple-routing',
	directives: [ROUTER_DIRECTIVES]
	template: `<div>
	Basic Routing
	<ul>
	  <li><a [routerLink]="['/component-one']">Component One</a></li>
	  <li><a [routerLink]="['/component-two']">Component Two</a></li>
	</ul>
	<div style="border: 1px solid black">
	  <router-outlet></router-outlet>
	</div>
	
	`
})
export class SimpleRouting {
  
}