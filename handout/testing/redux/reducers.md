# Testing Reducers

Luckily, testing reducers is a lot like testing our synchronous action creators, since all reducer operations are synchronous. This plays a big role in making our global state easy to keep track of, which is why we're big fans of Redux.

We'll test the counter reducer in [angular2-redux-starter](https://github.com/rangle/angular2-redux-starter), as follows:

```js
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

```js
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';
import counter from './counter';                                         

describe('counter reducers', () => {                                     
  it('should handle initial state', () => {                              
    expect(                                                         
      counter(undefined, {})                                             
    )                                                                    
    .toEqual(0)                                                         
  });                                                                    

  it('should handle INCREMENT_COUNTER', () => {                          
    expect(                                                         
      counter(0, {                                                       
        type: INCREMENT_COUNTER                                          
      })                                                                 
    )                                                                    
    .toEqual(1)                                                         
  });                                                                    

  it('should handle DECREMENT_COUNTER', () => {                          
    expect(                                                         
      counter(1, {                                                       
        type: DECREMENT_COUNTER                                          
      })                                                                 
    )                                                                    
    .toEqual(0)                                                         
  });                                                                    
});
```

Note that we're only testing the section of Redux state that the `counter` reducer is responsible for, and not the whole.
We can see from these tests that Redux is largely built on pure functions.
