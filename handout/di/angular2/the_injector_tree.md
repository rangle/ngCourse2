# The Injector Tree

Angular injectors (generally) return singletons.  That is, in the previous example,
all components in the application will receive the same random
number.  In Angular 1.x there was only one injector, and all services were
singletons.  Angular overcomes this limitation by using a tree of injectors.

In Angular there is not just one injector per application, there is _at least_ one injector per application.  Injectors are organized in a tree that parallels Angular's component tree.

Consider the following tree, which models a chat application consisting of two
open chat windows, and a login/logout widget.

![Image of a Component Tree, and a DI Tree](../../images/di-tree.png)

In the image above, there is one root injector, which is established through
`@NgModule`'s `providers` array. There's a `LoginService` registered with the
root injector.

Below the root injector is the root `@Component`.  This particular component has
no `providers` array and will use the root injector for all of its dependencies.

There are also two child injectors, one for each `ChatWindow` component.  Each
of these components has their own instantiation of a `ChatService`.

There is a third child component, `Logout/Login`, but it has no injector.

There are several grandchild components that have no injectors.  There are
`ChatFeed` and `ChatInput` components for each `ChatWindow`.  There are also
`LoginWidget` and `LogoutWidget` components with `Logout/Login` as their
parent.

The injector tree does not make a new injector for every component,
but does make a new injector for every component with a `providers` array in its decorator.
Components that have no `providers` array look to their parent component for an injector.
If the parent does not have an injector, it looks up until it reaches the root injector.

_Warning:_  Be careful with `provider` arrays.  If a child component is decorated with a
`providers` array that contains dependencies that were _also_ requested in the parent
component(s), the dependencies the child receives will shadow the parent dependencies.
This can have all sorts of unintended consequences.

Consider the following example:

*app/module.ts*
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ChildInheritorComponent, ChildOwnInjectorComponent } from './components/index';
import { Unique } from './services/unique';


const randomFactory = () => { return Math.random(); };

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    ChildInheritorComponent,
    ChildOwnInjectorComponent,
  ],
  /** Provide dependencies here */
  providers: [Unique],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

In the example above, `Unique` is bootstrapped into the root injector.

*app/services/unique.ts*
```typescript
import { Injectable } from '@angular/core';

@Injectable()
export class Unique {
  value = (+Date.now()).toString(16) + '.' +
    Math.floor(Math.random() * 500);
}
```

The `Unique` service generates a value unique to _its_ instance upon instantiation.

*app/components/child-inheritor.component.ts*
```typescript
import { Component, Inject } from '@angular/core';
import { Unique } from '../services/unique';

@Component({
  selector: 'app-child-inheritor',
  template: `<span>{{ value }}</span>`
})
export class ChildInheritorComponent {
  value = this.u.value;

  constructor(private u: Unique) { }
}
```

The child inheritor has no injector. It will traverse the component tree upwards looking for an injector.

*app/components/child-own-injector.component.ts*
```typescript
import { Component, Inject } from '@angular/core';
import { Unique } from '../services/unique';

@Component({
  selector: 'child-own-injector',
  template: `<span>{{ value }}</span>`,
  providers: [Unique]
})
export class ChildOwnInjectorComponent {
  value = this.u.value;

  constructor(private u: Unique) { }
}
```

The child own injector component has an injector that is populated with its own
instance of `Unique`.  This component will not share the same value as the
root injector's `Unique` instance.

*app/containers/app.ts*
```typescript
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
  value: number = this.u.value;

  constructor(private u: Unique) { }
}
```
[View Example][plunkInjectorTree]

[plunkInjectorTree]: http://plnkr.co/edit/abeUOuG8AdHDUcvjial8?p=preview "Injector Tree Example"
