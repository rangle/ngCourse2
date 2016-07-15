import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
@Component({
  selector: 'child-two',
  directives: [ ROUTER_DIRECTIVES ],
  template: `<p>Child Two {{id}}</p>
    <nav>
      <a [routerLink]="['child-one']">Child One</a>
      <a [routerLink]="['child-two-nested']">Child Two Nested</a>
      <a [routerLink]="['../child-one']">../child-one</a>
      <a [routerLink]="['../child-two']">../child-two</a>
      <a [routerLink]="['/component-two',1234]">/component-two,1234</a>
    </nav>
    <span style="color: red;">Child Two's router outlet:</span>
    <div style="border: 1px solid blue;">
      <router-outlet></router-outlet>
    </div>`
})
export default class ChildTwo { 
}