import {Component, Inject, provide} from '@angular/core';
import {ChildInheritor} from './components/child-inheritor.component';
import {ChildOwnInjector} from './components/child-own-injector.component';
import {Unique} from './services/unique';

@Component({
  selector: 'app',
  template: `
<p>
App's Unique dependency has a value of {{ value }}
</p>
<p>
which should match 
</p>
<p>
ChildInheritor's value: <child-inheritor></child-inheritor>
</p>
<p>
However,
</p>
<p>
ChildOwnInjector should have its own value: <child-own-injector></child-own-injector>
<p>
ChildOwnInjector's other instance should also have its own value <child-own-injector></child-own-injector>
</p>
  `,
  directives: [ChildInheritor, ChildOwnInjector]
})
export class App {
  value: number;
  constructor(u: Unique) {
    this.value = u.value;
  }
}
