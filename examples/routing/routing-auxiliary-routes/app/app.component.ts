import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import ComponentOne from './component-one';
import ComponentTwo from './component-two';

@Component({
	selector: 'simple-routing',
	directives: [ROUTER_DIRECTIVES]
	template: `<div>
	<h1>Aux Routing Example</h1>
	<ul>
    <li> <a [routerLink]="['./ComponentOne']">Load in Default Outlet</a> </li>
    <li> <a [routerLink]="['./ComponentOne',['TestAux1']]">Load Cmp1 in Aux 1</a></li>
    <li> <a [routerLink]="['./ComponentOne',['TestAux2']]">Load Cmp2 in Aux 2</a></li>
  </ul>
  <div style="border: 1px solid red;">
  <h3>Default Route Outlet</h3>
    <router-outlet></router-outlet>
  </div>
  <div style="border: 1px solid blue;">
  <h3>Test Aux 1</h3>
    <router-outlet name="testAux1"></router-outlet>
  </div>
  <div style="border: 1px solid green;">
  <h3>Test Aux 2</h3>
    <router-outlet name="testAux2"></router-outlet>
  </div>
  
	`
})
@RouteConfig([
  { path: '/',
    component: ComponentOne,
    as: 'ComponentOne',
    useAsDefault: true
  },
   {
    aux: 'testAux1',
    component: ComponentOne,
    name: 'TestAux1',
    path: '/aux1'
  },
    {
    aux: 'testAux2',
    component: ComponentTwo,
    name: 'TestAux2',
    path: '/aux2'
  }
])
export class SimpleRouting {
  
}