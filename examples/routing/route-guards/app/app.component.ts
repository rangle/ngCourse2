import {Component} from '@angular/core';
import ActivateGuard from './activate-guard';

@Component({
  selector: 'app',
  template: `
    <nav>
      <a [routerLink]="['component-one']">Component One</a>
      <a [routerLink]="['component-two']">Guarded Component Two</a>
    </nav>

    <div style="margin-top: 1rem;">
      Can activate:
      <input #canactivate type="checkbox" (change)="checkboxChanged(canactivate.checked)" />
    </div>

    <div style="color: green; margin-top: 1rem;">Outlet:</div>
    <div style="border: 2px solid green; padding: 1rem;">
      <router-outlet></router-outlet>
    </div>

    <p>
      Try navigating to component two. It is prevented until checkbox is checked.
    </p>
  `
})
export default class AppComponent {
  constructor(private activateGuard: ActivateGuard) {}

  checkboxChanged(canActivate) {
    // Update guard when checkbox checked.
    this.activateGuard.setCanActivate(canActivate);
  }
}
