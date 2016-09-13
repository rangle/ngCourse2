import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

@Injectable()
export class CounterActions {
  constructor(private store: Store) {}

  increment() {
    this.store.dispatch({ type: INCREMENT_COUNTER });
  }

  decrement() {
    this.store.dispatch({ type: DECREMENT_COUNTER });
  }

  incrementIfOdd() {
    this.store.take(1)
      .subscribe(({ counter }) => {
        if (counter % 2 !== 0) {
          this.store.dispatch({ type: INCREMENT_COUNTER });
        }
      });
  }

  incrementAsync(timeInMs = 1000) {
    this.delay(timeInMs).then(() => this.store.dispatch({ type: INCREMENT_COUNTER }));
  }

  private delay(timeInMs) {
    return new Promise((resolve,reject) => {
      setTimeout(() => resolve() , timeInMs);
    });
  }
}
