# Using Redux with Components

We will use the
[select pattern](https://github.com/angular-redux/ng2-redux#the-select-pattern)
from Ng2-Redux to bind our components to the store. To demonstrate how this
works, let's take a look at a small example with a counter component.

## Counter Example

Let's start by building out a counter component. The component will be
responsible for keeping track of how many times it was clicked, and displaying
that amount.

_app/components/counter-component.ts_

```javascript
import { Component } from '@angular/core';
import { select } from 'ng2-redux';
import { CounterActions } from '../actions/counter-actions';

@Component({
  selector: 'counter',
  providers: [ CounterActions ],
  template: `
  <p>
    Clicked: {{ counter$ | async }} times
    <button (click)="actions.increment()">+</button>
    <button (click)="actions.decrement()">-</button>
    <button (click)="actions.incrementIfOdd()">Increment if odd</button>
    <button (click)="actions.incrementAsync()">Increment async</button>
  </p>
  `
})
export class Counter {
  @select() counter$: Observable<number>;

  constructor(private actions: CounterActions) {}
}
```

[View Example](https://plnkr.co/edit/NmxQEawemZsdrmj3LT9C?p=preview)

The template syntax should be familiar by now, displaying a `Observable` counter
with the async pipe, and handling some click events.

In this case, the click events are bound to expressions that call our action
creators from the `CounterActions` ActionCreatorService.

Let's take a look at the use of `@select`.

`@select` is a feature of Ng2-Redux which is designed to help you attach your
store's state to your components in a declarative way. You can attach it to a
property of your component class and Ng2-Redux will create an
`Observable` and bind it to that property for you.

In this case, `@select` has no parameters, so Ng2-Redux will look for a store
property with the same name as the class variable. It omits the trailing `$`
since that's simply a naming convention for `Observables`.

So now, any time `store.counter` is updated by a reducer, `counter$` will
receive the new value and `| async` will update it in the template.

Note that `@select` supports a wide range of arguments to allow you to select
portions of your Redux store with a great deal of flexibility. See the
[Ng2-Redux](https://github.com/angular-redux/ng2-redux#the-select-pattern) docs
for more details.

The Ng2-Redux "connect pattern" style differs a bit from the "connect"
style used by `react-redux`; however by using Angular 2's DI and TypeScript's
decorators, we can have a nicely declarative binding where most of the work is
done in the template. We also get the power of `Observables` and
`OnPush` change detection for better performance.

Either way, we still benefit the Redux fundamentals of reducers and one-way
data-flow.
