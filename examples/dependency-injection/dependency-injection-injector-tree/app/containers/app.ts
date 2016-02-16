import {Component, Inject, provide} from 'angular2/core';
import {Hamburger} from '../services/hamburger';
import {ChildInheritor} from '../components/child-inheritor';
import {ChildOwnInjector} from '../components/child-own-injector';
import {Unique} from '../services/unique';

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
Sibling of ChildOwnInjector should not have its own value <child-own-injector></child-own-injector>
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
