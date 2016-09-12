# Testing Complex Actions

Things get a little trickier when we want to test asynchronous or conditional
action creators. Our goal is still the same: make sure that our operations are
dispatching the actions we're expecting.

## A Conditional Action

Consider the following conditional action (i.e., one that is fired depending
on current state):

```js
import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

@Injectable()
export class MyActionService {
  constructor(private redux: NgRedux) {};

  // A conditional action
  incrementIfOdd() {
    const { counter } = this.redux.getState();

    if (counter % 2 === 0) return;
    this.redux.dispatch({ type: INCREMENT_COUNTER });
  }
}
```

Unit testing is similar to before, but we need to mock our state as well as dispatch:

```js
import { NgRedux } from 'ng2-redux';
import { CounterActions } from './counter';

class MockRedux extends NgRedux<any> {
  constructor(private state: any) {
    super(null);
  }
  dispatch = () => undefined;
  getState = () => this.state;
}

describe('counter action creators', () => {
  let actions: CounterActions;
  let mockRedux: NgRedux<any>;
  let mockState: any = {};

  beforeEach(() => {
    // Our mock NgRedux can now accept mock state as a constructor param.
    mockRedux = new MockRedux(mockState);
    actions = new CounterActions(mockRedux);
  });

  it('incrementIfOdd should dispatch INCREMENT_COUNTER action if count is odd',
    () => {
      // Our tests can bake in the initial state they need.
      const expectedAction = {
        type: CounterActions.INCREMENT_COUNTER
      };

      mockState.counter = 3;
      spyOn(mockRedux, 'dispatch');
      actions.incrementIfOdd();

      expect(mockRedux.dispatch).toHaveBeenCalled();
      expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
    });

  it('incrementIfOdd should not dispatch INCREMENT_COUNTER action if count is even',
    () => {
      mockState.counter = 2;
      spyOn(mockRedux, 'dispatch');
      actions.incrementIfOdd();

      expect(mockRedux.dispatch).not.toHaveBeenCalled();
    });
});
```

## An Async Action

What about async actions like the following?

```js
import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

@Injectable()
export class CounterActions {
  constructor(private redux: NgRedux<any>) {}

  // ...

  incrementAsync(timeInMs = 1000) {
    this.delay(timeInMs).then(() => this.redux.dispatch({ type: INCREMENT_COUNTER }));
  }

  private delay(timeInMs) {
    return new Promise((resolve,reject) => {
      setTimeout(() => resolve() , timeInMs);
    });
  }
}
```

We can test this using the normal techniques for async service functions:

* If we can make `incrementAsync` return a promise, we can just return a promise
from the test and `jasmine` will wait until it settles.
* Alternately, we can use the `fakeAsync` technique discussed in the section on
testing components.

The thing to remember is that if we follow the ActionCreatorService
pattern, our actions are just functions on an Angular service. So we can mock
out NgRedux (and any other dependencies) and just test it as we would any other
Angular 2 service.
