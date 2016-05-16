# The Injector Tree

Angular 2 injectors (generally) return singletons.  That is, in the previous example, all components in the application will receive the _same_ random
number.  In Angular 1.x there was only one injector, and all _services_ were
singletons.  Angular 2 overcomes this limitation by using a tree of injectors.

In Angular 2 there is not just one injector per application, there is _at least_ one injector per application.  Injectors are organized in a tree that parallels Angular 2's component tree.

Consider the following tree, which models a chat application consisting of two
open chat windows, and a login/logout widget.

![Image of a Component Tree, and a DI Tree](../../images/di-tree.png)

In the image above, there is one root injector, which is also the root
component.  This is also the application bootstrap area.  There's a
`LoginService` registered with the root injector.

There are also two child injectors, one for each `ChatWindow` component.  Each
one of these components has their _own_ instantiation of a `ChatService`.

There is a third child component, `Logout/Login` component , but it has no
injector.

There are several grandchild components that have no injectors.  There are
`ChatFeed`, and `ChatInput` components for each `ChatWindow`.  There are also
`LoginWidget`, and `LogoutWidget` components with `Logout/Login` as their
parent.

The injector tree does _not_ make a new injector for every component.  The injector tree _does_ make a new injector for every component with a `providers` array in its decorator.  Components that have no `providers` array look to their parent component for an injector. If the parent does not have an injector, it looks up on, and on until it reaches the root injector.

_Warning:_ be careful with `provider` arrays.  If a child component is decorated with a `providers` array, and that array contains dependencies that were _also_ requested in the parent component(s) the dependencies the child receives will _shadow_ the parent dependencies.  This can have all sorts of unintended consequences.

Consider the following example:

app/boot.ts
```js
import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {App} from './containers/app';
import {Unique} from './services/unique';

bootstrap(App, [Unique]);

```

In the example above, `Unique` is bootstrapped into the root injector.

*app/services/unique.ts*
```js
import {Injectable} from '@angular/core';

@Injectable()
export class Unique {
  value: string;
  constructor() {
    this.value = (+Date.now()).toString(16) + '.' +
      Math.floor(Math.random() * 500);
  }
}
```

The `Unique` service, it generates a value unique to _its_ instance upon
instantiation

*app/components/child-inheritor.component.ts*
```js
import {Component, Inject} from '@angular/core';
import {Unique} from '../services/unique';

@Component({
  selector: 'child-inheritor',
  template: `<span>{{ value }}</span>`
})
export class ChildInheritor {
  value: number;
  constructor(u: Unique) {
    this.value = u.value;
  }
}
```

The child inheritor has no injector, it will traverse the component tree
_upwards_ looking for an injector.

*app/components/child-own-injector.component.ts*
```js
import {Component, Inject} from '@angular/core';
import {Unique} from '../services/unique';

@Component({
  selector: 'child-own-injector',
  template: `<span>{{ value }}</span>`,
  providers: [Unique]
})
export class ChildOwnInjector {
  value: number;
  constructor(u: Unique) {
    this.value = u.value;
  }
}
```

The child own injector component has injector that is populated with its own
instance of `Unique`.  This component will _not_ share the same value as the
root injector's `Unique` instance.

*app/containers/app.ts*
```js

import {Component, Inject, provide} from '@angular/core';
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

```

[View Example][plunkInjectorTree]

[plunkInjectorTree]: http://plnkr.co/edit/GXG3AVoJFI1vmJB3vZF3?p=preview "Injector Tree Example"
