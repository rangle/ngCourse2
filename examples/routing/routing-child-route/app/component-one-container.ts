import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import ComponentOne from './component-one';
import ComponentOneChildOne from './component-one-child-one';
import ComponentOneChildTwo from './component-one-child-two';
import ComponentThree from './component-three';

@Component({
  directives: [ROUTER_DIRECTIVES]
  selector: 'component-one-container',
  template: `Component One Container
  <br/>
  
  <ul>
    <li>
        <a [routerLink]="['./ComponentOneChildOne']">./ComponentOneChildOne</a>
    </li>
    <li>
        <a [routerLink]="['./ComponentOneChildTwo']">./ComponentOneChildTwo</a>
    </li>
    <li>
        <a [routerLink]="['./ComponentThree',{message:'Parent One Child'}]">./ComponentThree</a>
    </li>
    <li>
        <a [routerLink]="['/ComponentThree',{message:'Root Child'}]">/ComponentThree</a>
    </li>
  </ul>
  <div style="border: 1px solid red">
    <router-outlet></router-outlet>
  </div>
  `
})
@RouteConfig([
  { path: '/',  component: ComponentOne, as: 'ComponentOne', useAsDefault: true },
  { path: '/component-three-nested/:message',  component: ComponentThree, as: 'ComponentThree' },
  { path: '/component-one-child-one', component: ComponentOneChildOne, as 'ComponentOneChildOne' },
  { path: '/component-one-child-two', component: ComponentOneChildTwo, as 'ComponentOneChildTwo' },
  { path: '/component-one-child-three/:message', component: ComponentThree, as 'ComponentThree' }
  ])
export default class ComponentOneContainer { 
  
}



