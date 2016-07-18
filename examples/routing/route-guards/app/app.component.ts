import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ActivateGuard } from './activate-guard';

@Component({
  selector: 'app',
  directives: [ROUTER_DIRECTIVES],
  template: `
    <nav>
      <a [routerLink]="['/component-one']">Component One</a>
      <a [routerLink]="['/component-two']">Guarded Component Two</a>
    </nav>
    <div>
      Can activate:
      <input #canactivate type="checkbox" (change)="checkboxChanged(canactivate.checked)" />
    </div>
    <div style="color: green;">Outlet:</div>
    <div style="border: 1px solid green;">
      <router-outlet></router-outlet>
    </div>
    <p>
      Try navigating to component two. It is prevented until checkbox is checked.
    </p>
  `
})
export class AppComponent {
  constructor(private activateGuard: ActivateGuard) {}

  checkboxChanged(canActivate) {
    // Update guard when checkbox checked.
    this.activateGuard.setCanActivate(canActivate);
  }
}