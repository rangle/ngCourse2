# Component Architecture

Our previous `CounterComponent` example is called a **smart component** - it knew about Redux, the structure of the state and the actions it needed to call. In theory you can drop this component into any area of your application and just let it work, but it will be tightly bound to that specific slice of state and those specific actions.

For example, what if we wanted to have multiple counters tracking different things on the page? Or how about counting the number of red clicks vs blue clicks?

To help make components more generic and reusable, it's worth trying to separate them into _container_ components and _presentational_ components.

|  | Container Components | Presentational Components |
| :--- | :--- | :--- |
| Location | Top level, route handlers | Middle and leaf components |
| Aware of Redux | Yes | No |
| To read data | Subscribe to Redux state | Read state from @Input properties |
| To change data | Dispatch Redux actions | Invoke callbacks from @Output properties |

[redux docs](http://redux.js.org/docs/basics/UsageWithReact.html)

Keeping this in mind, let's refactor our `CounterComponent` to be a _presentational_ component.

## Modifying `AppComponent` to become a smart component

First, let's modify our top-level application component to use the `CounterService` and `CounterActions`, just as `CounterComponent` did:

_app/app.component.ts_

```typescript
import {Component} from '@angular/core';
import {Observable} from 'rxjs';

import {Counter} from '../../models/counter';
import {CounterService} from '../../services/counter.service';
import {CounterActions} from '../../store/counter/counter.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  counter$: Observable<Counter>;

  constructor(
    counterService: CounterService,
    public actions: CounterActions
  ) {
    this.counter$ = counterService.getCounter();
  }

}
```

Now our `AppComponent` is a smart-component, because it's aware of Redux, it's presence in the application state and the underlying services. As with previous examples, we can use the `async` pipe to obtain the most recent `counter` value and pass it along to other components within the template.

And while we haven't looked at the `@Output()`'s on `CounterComponent` just yet, we'll want to delegate those events to our action creators in `CounterActions`.

_app/app.component.html_

```markup
<counter [counter]="counter$ | async"
         (onIncrement)="actions.increment()"
         (onDecrement)="actions.decrement()"
         (onReset)="actions.reset()">
</counter>
```

## Modifying `CounterComponent` to become a presentation component

In turn, we need to make the `CounterComponent` from a _smart component_ into a _dumb component_. For this, we will pass the data into the component using `@Input` properties and click events using `@Output()` properties, removing the use of `CounterService` and `CounterActions` entirely.

_app/counter/counter.component.ts_

```typescript
import {Component, Input, EventEmitter, Output} from '@angular/core';

import {Counter} from '../../models/counter';

@Component({
  selector: 'counter',
  templateUrl: './counter.component.html'
})
export class CounterComponent {

  @Input()
  counter: Counter;

  @Output()
  onIncrement: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  onDecrement: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  onReset: EventEmitter<void> = new EventEmitter<void>();

}
```

Our child components become much simpler and testable, because we don't have to use the `async` pipe to work with our state, which removes a lot of pain when dealing with lots of `@Input`'s or the need to use complex expressions with `Observable`'s.

We can also now simply use core Angular features to emit values whenever a click event happens:

_app/counter/counter.component.html_

```markup
<p>
  Clicked: {{counter.currentValue}} times
  <button (click)="onIncrement.emit()">+</button>
  <button (click)="onDecrement.emit()">-</button>
  <button (click)="onReset.emit()">Reset</button>
</p>
```

We now have a nicely-reusable presentational component with no knowledge of Redux or our application state.

