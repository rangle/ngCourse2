import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import ComponentOne from './component-one';
import ComponentOneContainer from './component-one-container';
import ComponentTwo from './component-two';
import ComponentThree from './component-three';
@Component({
	selector: 'simple-routing',
	directives: [ROUTER_DIRECTIVES]
	template: `<div>
	Basic Routing
	<ul>
	  <li><a [routerLink]="['./ComponentOneContainer']">Component One</a></li>
	  <li><a [routerLink]="['./ComponentTwo']">Component Two</a></li>
	  <li><a [routerLink]="['./ComponentThree',{message: 'Hello World'}]">Component Three with Param</a></li>
	</ul>
	<div style="border: 1px solid black">
	  <router-outlet></router-outlet>
	</div>
	`
})
@RouteConfig([
  {path: '/componentOne/...', as: 'ComponentOneContainer', useAsDefault: true, component: ComponentOneContainer},
  {path: '/componentTwo', as: 'ComponentTwo', useAsDefault: false, component: ComponentTwo},
  {path: '/componentThree/:message', as: 'ComponentThree', useAsDefault: false, component: ComponentThree}
  ])
export class SimpleRouting {
  
}