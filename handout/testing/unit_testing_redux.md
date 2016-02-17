# Unit Testing Redux

The units that make up redux are actions and reducers. Lets try testing them.

## Testing Synchronous Actions

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

## Testing Asynchronous Actions

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

There's more than one flavor of asynchronous action creating in redux, so you might have to cook something that fits your unit's needs.  

## Testing Reducers

Luckily, testing reducers is a lot like testing our synchronous action creators, since all reducer operations are synchronous. This plays a big role in making our global state easy to keep track of, which is why we're big fans of redux.

We'll test the counter reducer in [ng2-redux-starter](https://github.com/rangle/angular2-redux-starter), which is the following:

```ts
export default function counter(state = 0, action) 
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1;
    case DECREMENT_COUNTER:
      return state - 1;
    default:
      return state;
  }
}
```

As you can see, there are three cases to test: the default case, the increment, and the decrement. We want to test that our actions trigger the state changes we expect from the reducer. 

```ts
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';
import counter from './counter';                                         

describe('counter reducers', () => {                                     
  it('should handle initial state', () => {                              
    chai.expect(                                                         
      counter(undefined, {})                                             
    )                                                                    
    .to.equal(0)                                                         
  });                                                                    

  it('should handle INCREMENT_COUNTER', () => {                          
    chai.expect(                                                         
      counter(0, {                                                       
        type: INCREMENT_COUNTER                                          
      })                                                                 
    )                                                                    
    .to.equal(1)                                                         
  });                                                                    

  it('should handle DECREMENT_COUNTER', () => {                          
    chai.expect(                                                         
      counter(1, {                                                       
        type: DECREMENT_COUNTER                                          
      })                                                                 
    )                                                                    
    .to.equal(0)                                                         
  });                                                                    
});
```
Note that we're only testing the section of redux state that the `counter` reducer is responsible for, and not the whole. 
We can see from these tests that redux is largely built on pure functions. 

## Afterthoughts

The examples outlined above are just one approach to unit testing in redux. During actual development it might prove to be too costly to maintain tests for every action and reducer, and in some cases even trivial (i.e. should I be paranoid about this JSON object with one property being returned?). 

Another approach we've tried is to treat the overall state change in the store triggered by an action (or by a series of actions) as a single unit --- in the redux world reducers don't function without actions and vice versa, so why separate them? This leaves more wiggle room when making changes to actions and reducers without losing scope of what redux is doing for our app.  

