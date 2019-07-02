# Implementing Components

To demonstrate how to use the `CounterService` in your components, let's start by building out a small `CounterComponent`. The component will be responsible for incrementing and decrementing the counter by one, as well as allowing the user to reset the counter to zero.

_app/components/counter.component.ts_

```typescript
import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {CounterService} from '../services';
import {CounterActions} from '../store/counter/counter.actions';

@Component({
  selector: 'counter',
  templateUrl: './counter.component.html'
})
export class CounterComponent {

  private currentValue$: Observable<number>;

  constructor(
    counterService: CounterService,
    public actions: CounterActions
  ) {
    this.currentValue$ = counterService.getCurrentValue();
  }

}
```

_app/components/counter.component.html_

```markup
<p>
  Clicked: {{currentValue$ | async}} times
  <button (click)="actions.increment()">+</button>
  <button (click)="actions.decrement()">-</button>
  <button (click)="actions.reset()">Reset</button>
</p>
```

The template syntax should be familiar by now, displaying an `Observable` counter value with the `async` pipe. Any time `appState.counter.currentValue` is updated by a reducer, `currentValue$` will receive the new value and `| async` will update it in the template.

The component also handles some click events. Each click event is bound to expressions that call our action creators from the `CounterActions` ActionCreatorService.

