# Reducers as State Management

This simple idea turns out to be very powerful. With Redux, you replay a series
of events into the reducer and get your new application state as a result.

Reducers in a Redux application should not mutate the state, but return a copy
of it, and be side-effect free. This encourages you to think of your application
as UI that gets "computed" from a series of events in time.

Let's take a look at a simple counter reducer.

## Simple Reducer

_app/reducer/counter-reducer.ts_
```javascript
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter-actions';

export default function counter(state = 0, action) {
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

We can see here that we are passing in an initial state and an action. To
handle each action we have set up a switch statement. Instead of each reducer
needing to explicitly subscribe to the dispatcher, every action gets passed into
each reducer, which handles the actions it's interested in and then returns the
new state along to the next reducer.

Reducers should be side-effect free. This means that they should not
modify things outside of their own scope. The should simply compute the next
application state as a pure function of the reducer's arguments. 

For this reason, side-effect causing operations, such as
updating a record in a database, generating an id, etc. should be handled
elsewhere in the application such as in the action creators, using middleware such as [redux-saga](https://github.com/yelouafi/redux-saga) or [ngrx/effects](https://github.com/ngrx/effects).

Another consideration when creating your reducers is to ensure that they are immutable and not modifying the state of your application. If you mutate your application state, it can cause unexpected behavior. There are a few ways to help maintain immutability in your reducers. One way is by using new ES6 features such as `Object.assign` or the spread operator for arrays.

```js
function immutableObjectReducer(state = { someValue: 'value'} , action) {
  switch(action.payload) {
    case SOME_ACTION:
      return Object.assign({}, state, { someValue: action.payload.value });
    default:
      return state;
  }
}

function immutableArrayReducer(state = [1,2,3], action) {
  switch(action.payload) {
    case ADD_ITEM:
      return [...state,action.payload.value]
    default:
      return state;
  }
}
```

However, when dealing with complex or deeply nested objects, it can be difficult to maintain immutability in your application using this syntax. This is where a library like ImmutableJS can help.
