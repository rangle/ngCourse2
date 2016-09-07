import { Component } from '@angular/core';

@Component({
  selector: 'child-two',
  template: `
    <p>Child Two <b><code>ID: {{ id }}</code></b></p>

    <nav>
      <a [routerLink]="['child-one']">Child One</a><br />
      <a [routerLink]="['child-two-nested']">Child Two Nested</a><br />
      <a [routerLink]="['../child-one']">../Child One</a><br />
      <a [routerLink]="['../child-two']">../Child Two</a><br />
      <a [routerLink]="['/component-two', 456]">/Component Two, 456</a><br />
    </nav>

    <div style="color: orange; margin-top: 1rem;">Child Two's router outlet:</div>
    <div style="border: 2px solid orange; padding: 1rem;">
      <router-outlet></router-outlet>
    </div>
  `
})
export default class ChildTwo {
}
