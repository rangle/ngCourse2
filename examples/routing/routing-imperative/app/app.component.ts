import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

@Component({
  selector: 'app',
  directives: [ROUTER_DIRECTIVES],
  template: `
    <nav>
      <a [routerLink]="['/component-one']">Component One</a>
      <a [routerLink]="['/component-two', 123]">Component Two (param: 123)</a>
    </nav>
    <button (click)="onClick()">Go to Component Two (param: 456)</button>
    
    <div style="color: green;">Outlet:</div>
    <div style="border: 1px solid green;">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  constructor (private router: Router) {}
  onClick () {
    this.router.navigate(['/component-two', 456]);
  }
}