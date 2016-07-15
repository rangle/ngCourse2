import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'app',
  directives: [ROUTER_DIRECTIVES],
  template: `
    <nav>
      <a [routerLink]="['/component-one']">Component One</a>
      <a [routerLink]="['/component-two', 123]">Component Two</a>
    </nav>
    <div style="color: green;">Outlet:</div>
    <div style="border: 1px solid green;">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  
}