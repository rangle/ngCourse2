import { Component, Inject } from '@angular/core';
import { Unique } from './services/unique';

@Component({
  selector: 'app-root',
  template: `
    <p>
      App's Unique dependency has a value of {{ value }}
    </p>
    <p>
      which should match
    </p>
    <p>
      ChildInheritor's value:
      <app-child-inheritor></app-child-inheritor>
    </p>
    <p>
      However,
    </p>
    <p>
      ChildOwnInjector should have its own value:
      <app-child-own-injector></app-child-own-injector>
    </p>
    <p>
      ChildOwnInjector's other instance should also have its own value:
      <app-child-own-injector></app-child-own-injector>
    </p>`,
})
export class AppComponent {
  value = this.u.value;

  constructor(private u: Unique) { }
}
