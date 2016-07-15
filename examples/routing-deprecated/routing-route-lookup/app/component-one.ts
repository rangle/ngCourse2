import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import ComponentOne from './component-one';
import ComponentTwo from './component-two';
import ComponentThree from './component-three';


@Component({
  directives: [ROUTER_DIRECTIVES]
  selector: 'component-one',
  template: `Component One
  <br/>
  
  <ul>
	  <li><a [routerLink]="['/ComponentTwo']">/ComponentTwo</a></li>
	  <li><a [routerLink]="['./ComponentOneTop']">./ComponentOneTop</a></li>
	  <li><a [routerLink]="['/ComponentThree',{message: 'Routed from Component One to Parent'}]">/ComponentThree</a></li>
	  <li><a [routerLink]="['./ComponentThree',{message: 'Child Route'}]">./ComponentThree</a></li>
	</ul>
  <div style="border: 1px solid red">
    <router-outlet></router-outlet>
  </div>
  `
})
@RouteConfig([
  { path: '/',  component: ComponentTwo, as 'ComponentOneTop', useAsDefault: true },
  { path: '/my-path/:message',  component: ComponentThree, as 'ComponentThree', useAsDefault: false }
  ])
export default class ComponentOne { 
  console.log(window.location)
}

