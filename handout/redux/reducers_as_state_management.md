# Reducers as State Management

Reducers are a simple idea that turns out to be very powerful. With Redux, you
replay a series of actions into the reducer and get your new application state 
as a result.

Reducers in a Redux application should not mutate the state, but *return a copy*
of it, and be side-effect free. This encourages you to think of your application
as UI that gets "computed" from a series of actions in time.

## Simple Reducer

Let's take a look at a simple counter reducer.

_app/store/counter/counter.reducer.ts_
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
an `Action`. To handle each action, a common approach is to use a `switch` 
statement. Instead of each reducer needing to explicitly subscribe to the 
dispatcher, every action gets passed into each reducer, which handles the 
actions it's interested in and then returns the new state along to the next 
reducer.

Reducers should be side-effect free. This means that they should not modify 
things outside of their own scope. They should simply compute the next 
application state as a pure function of the reducer's arguments.

For this reason, side-effect causing operations, such as updating a record in a 
database, generating an id, etc. should be handled elsewhere in the application,
like in your action creators or using 
[@ngrx/effects](https://github.com/ngrx/effects).

## Complex Reducer

Another consideration when creating your reducers is to ensure that they are 
immutable and not modifying the state of your application. If you mutate your 
application state, it can cause unexpected behavior. There are a few ways to 
help maintain immutability in your reducers. One way is by using new ES6 
features such as `Object.assign()` or the spread operator for arrays.

_app/models/counter.ts_
```typescript
// ...

export function setCounterCurrentValue(counter: Counter, currentValue: number): Counter {
  return Object.assign({}, counter, { currentValue });
}

// ...
```

Here, the `setCounterCurrentValue()` function creates a new `Counter` object 
that overwrites the `counter.currentValue` property with a new value while 
maintaining the references and values of all of the other properties from 
`counter`.

Let's update our reducer to utilize this concept:

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

With each action, we take the existing `counter` state and create a new
state with the updated value (such as `counter.currentValue + 1`).

When dealing with complex or deeply nested objects, it can be difficult to 
maintain immutability in your application using this syntax. This is where a 
library like [Ramda](http://ramdajs.com/) can help.
