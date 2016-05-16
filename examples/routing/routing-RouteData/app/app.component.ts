import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import ComponentOne from './component-one';
import ComponentTwo from './component-two';

@Component({
	selector: 'simple-routing',
	directives: [ROUTER_DIRECTIVES]
	template: `<div>
	Basic Routing
	<ul>
	  <li><a [routerLink]="['/ComponentOne']">Component One</a></li>
	  <li><a [routerLink]="['/ComponentTwo',{message:'Route Params In Message'}]">Component Two</a></li>
	</ul>
	<div style="border: 1px solid black">
	  <router-outlet></router-outlet>
	</div>
	
	`
})
@RouteConfig([
  {path: '/componentOne', as: 'ComponentOne', useAsDefault: true, component: ComponentOne},
  {path: '/componentTwo/:message', as: 'ComponentTwo', useAsDefault: false, component: ComponentTwo, data: { passedData: 'Passed in via Data'}}
  ])
export class SimpleRouting {
  
}