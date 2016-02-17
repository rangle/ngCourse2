import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import ComponentOne from './component-one';
import ComponentTwo from './component-two';
import ComponentThree from './component-three';
@Component({
	selector: 'simple-routing',
	directives: [ROUTER_DIRECTIVES]
	template: `<div>
	Using the Router Programmatically
	<ul>
	  <li><a [routerLink]="['/ComponentOne']">Component One</a></li>
	  <li><a [routerLink]="['/ComponentTwo']">Component Two</a></li>
	  <li><a [routerLink]="['/ComponentThree',{message: 'Hello World'}]">Component Three with Param</a></li>
	</ul>
	<div style="border: 1px solid black">
	  <router-outlet></router-outlet>
	</div>
	
	`
})
@RouteConfig([
  {path: '/componentOne', as: 'ComponentOne', useAsDefault: true, component: ComponentOne},
  {path: '/componentTwo', as: 'ComponentTwo', useAsDefault: false, component: ComponentTwo},
  {path: '/componentThree/:message', as: 'ComponentThree', useAsDefault: false, component: ComponentThree}
  ])
export class SimpleRouting {
  
}