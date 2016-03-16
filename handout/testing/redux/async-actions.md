# Testing Asynchronous Actions

Things get a little tricky when we want to test asynchronous action creators. Our goal is still the same: make sure that our operations are creating the actions we're expecting. But async action creators don't return JSON objects. In [ng2-redux-starter](https://github.com/rangle/angular2-redux-starter) we have a thunk called 'incrementIfOdd':

```ts
export function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}
```

The thunk has access to our redux store's `dispatch` and `getState` methods. We expect thunks to dispatch one or more actions in a specific order. [One of our developers](https://github.com/bertrandk) tested exactly that by applying the `thunk` middleware to a mock store:

```ts
import { applyMiddleware } from 'redux';
const thunk = require('redux-thunk');

const middlewares = [thunk];

export function mockStore({ getState, dispatch }) {
  function createStore() {                          
    return { getState, dispatch };                  
  }                                                 

  const finalCreateStore = applyMiddleware(         
    ...middlewares                                  
  )(createStore);                                   

  return finalCreateStore();                        
}                                                   
```
This helper takes in mock `getState` and `dispatch` methods and returns a mock store with the `thunk` middleware applied to it. `incrementIfOdd` will access these mock methods.

```ts
import {mockStore} from '../tests.helpers';
import {INCREMENT_COUNTER, DECREMENT_COUNTER} from './counter';
import * as CounterActions from './counter';

describe('counter action creators', () => {                     
  ...

  it('incrementIfOdd should dispatch INCREMENT_COUNTER if counter is odd', (done) => {
    const expectedAction = { type: INCREMENT_COUNTER };

    const store = mockStore({                          
      getState: () => {                                
        return {                                       
          counter: 1                                   
        }                                              
      },                                               
      dispatch: (action) => {                          
        chai.expect(action)                            
          .to.deep.equal(expectedAction);              

        done();                                        
      }                                                
    });                                                

    store.dispatch(CounterActions.incrementIfOdd());   
  });
});
```

We create a mock store with the state's `counter` set to an odd number and expect `incrementIfOdd` to indeed `INCREMENT_COUNTER`. The mock `dispatch` method checks for the action we expect to be created and dispatched.

The tricky part is that `CounterActions.incrementIfOdd` is a thunk, so the `store.dispatch` above is actually handled by the `thunk` middleware and *not* the `dispatch` we pass into our `mockStore` helper, which is expecting a generic JSON object.

With a few adjustments we can also test thunks that dispatch more than one action.

```
it('incrementIfOdd should dispatch INCREMENT_COUNTER if counter is odd', (done) => {
  const expectedActions = [
   { type: INCREMENT_COUNTER },
   { type: DECREMENT_COUNTER },
   { type: INCREMENT_COUNTER },
   { type: DECREMENT_COUNTER },
   { type: INCREMENT_COUNTER },
   { type: DECREMENT_COUNTER }
  ];

  const store = mockStore({                          
    getState: () => {                                
      return {                                       
        counter: 1                                   
      }                                              
    },                                               
    dispatch: (action) => {                          
      const expectedAction = expectedActions.shift();

      chai.expect(action)                            
        .to.deep.equal(expectedAction);

      if (expectedAction.length === 0) {
        done();                                        
      };
    }                                                
  });                                                

  // some thunk that dispatches our expectedActions
  store.dispatch(CounterActions.zigZagZigala());   
});
```

These asynchronous examples are based on the `thunk` pattern.  Redux is very flexible and there are many other ways to implement asynchronous actions, `thunk`s are merely the most common.  Other asynchronous implementations may require a different approach to unit testing.
