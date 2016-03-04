# Redux Reducers

While a very simple idea, it is very powerful. With Redux, you replay a series of events into the reducer - and get your new application state as a result.

Reducers in a Redux application should not mutate the state, but return a copy of it, and be side-effect free. Lets take a look at a simple counter reducer.

## Simple Reducer

__app/reducer/counter-reducer.ts__
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

We can see here that we are passing in an initial state, and an action. To handle each action - we have setup a switch statement. Instead of each reducer needing to explicitly subscribe to the dispatcher - every action gets passed into every reducer, handles the action it is interested in, and otherwise returns the state along to the next reducer.

Reducers in Redux should be side-effect free, that means that they should not modify things outside of the application state. Instead, they should reflect the state of the application. This is why side-effect causing operations, such as updating a record in a database, generating an id, etc should be handled elsewhere in the application - such as in the action creators, or middleware.

Another consideration when creating your reducers, is to ensure that they are immutable and not modifying the state of your application. If you mutate your application state, it can cause unexpected behavior. There are a few ways to help maintain immutability in your reducers. One, is using new ES6 features such as the spread operator for objects and arrays.

```js
let immutableObjectReducer = (state = { someValue: 'value'} , action) => {
  switch(action.payload) {
    case SOME_ACTION:
    return Object.assign({}, state, { someValue: action.payload.value });
    default:
    return state;

  }
}

let immutableArrayReducer = (state = [1,2,3], action) => {
  switch(action.payload) {
    case ADD_ITEM:
      return [...state,action.payload.value]
    break;
    default:
    return state;
  }
}
```

However, if dealing with complex or deeply nested objects - it can be difficult to maintain immutability in your application using this syntax. This is where a library like ImmutableJS can help.
