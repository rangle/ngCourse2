import {Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app',
  template: `
    <nav>
      <a [routerLink]="['/component-one']">Component One</a>
      <a [routerLink]="['/component-two', 123]">Component Two (id: 123)</a>
    </nav>

    <div style="margin-top: 1rem;">
      <button (click)="onClick()">Go to Component Two (param: 456)</button>
    </div>

    <div style="color: green; margin-top: 1rem;">Outlet:</div>
    <div style="border: 2px solid green; padding: 1rem;">
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
