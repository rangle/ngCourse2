# Testing Simple Actions

Consider the following simple actions, from the Redux chapter of this book:

```js
import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

@Injectable
export class CounterActions {
  constructor(private redux: NgRedux<any>) {}

  increment() {
    this.redux.dispatch({ type: INCREMENT_COUNTER });
  }

  decrement() {
    this.redux.dispatch({ type: DECREMENT_COUNTER });
  }
}
```

These are pretty straightforward to test:

```js
import { NgRedux } from 'ng2-redux';
import {
  CounterActions,
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
} from './counter';

// Mock out the NgRedux class with just enough to test what we want.
class MockRedux extends NgRedux<any> {
  constructor() {
    super(null);
  }
  dispatch = () => undefined;
}

describe('counter action creators', () => {
  let actions: CounterActions;
  let mockRedux: NgRedux<any>;

  beforeEach(() => {
    // Initialize mock NgRedux and create a new instance of the
    // ActionCreatorService to be tested.
    mockRedux = new MockRedux();
    actions = new CounterActions(mockRedux);
  });

  it('increment should dispatch INCREMENT_COUNTER action', () => {
    const expectedAction = {
      type: INCREMENT_COUNTER
    };

    spyOn(mockRedux, 'dispatch');
    actions.increment();

    expect(mockRedux.dispatch).toHaveBeenCalled();
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('decrement should dispatch DECREMENT_COUNTER action', () => {
    const expectedAction = {
      type: DECREMENT_COUNTER
    };

    spyOn(mockRedux, 'dispatch');
    actions.decrement();

    expect(mockRedux.dispatch).toHaveBeenCalled();
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
```

We just make sure that our action creators do indeed dispatch the correct actions.
