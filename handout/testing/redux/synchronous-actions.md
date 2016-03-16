# Testing Synchronous Actions

Recall that by synchronous we mean action creators that return a simple JSON object, like the first two counter actions in [ng2-redux-starter](https://github.com/rangle/angular2-redux-starter).   

```ts
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

export function decrement() {
  return {
    type: DECREMENT_COUNTER
  };
}

...

```

These are pretty straightforward to test.

```ts
import {INCREMENT_COUNTER, DECREMENT_COUNTER} from './counter';
import * as CounterActions from './counter';

describe('counter action creators', () => {                     
  it('increment should create INCREMENT_COUNTER action', () => {
    chai.expect(CounterActions.increment())                     
      .to.deep.equal({                                          
        type: INCREMENT_COUNTER                                 
      });                                                       
  });                                                           

  it('decrement should create DECREMENT_COUNTER action', () => {
    chai.expect(CounterActions.decrement())                     
      .to.deep.equal({                                          
        type: DECREMENT_COUNTER                                 
      });                                                       
  });                                                           

  ...

});                                                             
```

We just make sure that our action creators do indeed create actions.
