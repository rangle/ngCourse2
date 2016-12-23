# Reducers as State Management

Reducers are simple idea that turns out to be very powerful. With Redux, you 
replay a series of events into the reducer and get your new application state as
a result.

Reducers in a Redux application should not mutate the state, but *return a copy*
of it, and be side-effect free. This encourages you to think of your application
as UI that gets "computed" from a series of events in time.

Let's take a look at a simple counter reducer.

## Simple Reducer

_app/state/counter/counter.reducer.ts_
```typescript
import {Action} from '@ngrx/store';

import {CounterActions} from './counter.actions';

export default function counterReducer(state: number = 0, action: Action): number {
  switch (action.type) {
    case CounterActions.INCREMENT:
      return state + 1;
    case CounterActions.DECREMENT:
      return state - 1;
    case CounterActions.RESET:
      return 0;
    default:
      return state;
  }
}
```

We can see here that we are passing in an initial state (the current number) and
an `Action`. To handle each action, a common approach is to use a switch 
statement. Instead of each reducer needing to explicitly subscribe to the 
dispatcher, every action gets passed into each reducer, which handles the 
actions it's interested in and then returns the new state along to the next 
reducer.

Reducers should be side-effect free. This means that they should not modify 
things outside of their own scope. They should simply compute the next 
application state as a pure function of the reducer's arguments.

For this reason, side-effect causing operations, such as updating a record in a 
database, generating an id, etc. should be handled elsewhere in the application,
typically using [ngrx/effects](https://github.com/ngrx/effects).

## Complex Reducer

Another consideration when creating your reducers is to ensure that they are 
immutable and not modifying the state of your application. If you mutate your 
application state, it can cause unexpected behavior. There are a few ways to 
help maintain immutability in your reducers. One way is by using new ES6 
features such as `Object.assign` or the spread operator for arrays:

_/src/models/counter.ts_
```typescript
// ...

export function setCounterCurrentValue(counter: Counter, currentValue: number): Counter {
  return Object.assign({}, counter, {
    currentValue: currentValue
  });
}

// ...
```

Here, the `setCounterCurrentValue()` function overwrites the `currentValue` 
property with a new value/reference while maintaining the references and values
of other properties.

```typescript
import {Action} from '@ngrx/store';

import {Counter, createDefaultCounter, setCounterCurrentValue} from '../../models/counter';
import {CounterActions} from './counter.actions';

export function counterReducer(
  counter: Counter = { currentValue: 0 }, 
  action: Action
): Counter {
  switch (action.type) {
    case CounterActions.INCREMENT:
      return setCounterCurrentValue(counter, counter.currentValue + 1);

    case CounterActions.DECREMENT:
      return setCounterCurrentValue(counter, counter.currentValue - 1);

    case CounterActions.RESET:
      return setCounterCurrentValue(counter, 0);

    default:
      return counter;
  }
}
```

```js
function immutableObjectReducer(state = { someValue: 'value'} , action) {
  switch(action.payload) {
    case SOME_ACTION:
      return Object.assign({}, state, { someValue: action.payload.value });
    default:
      return state;
  }
}

function immutableArrayReducer(state = [1, 2, 3], action) {
  switch(action.payload) {
    case ADD_ITEM:
      return [...state,action.payload.value];
    default:
      return state;
  }
}
```

However, when dealing with complex or deeply nested objects, it can be difficult to maintain immutability in your application using this syntax. This is where a library like Immutable.js can help.
