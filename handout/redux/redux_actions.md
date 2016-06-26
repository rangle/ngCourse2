# Redux Actions

Redux actions should generally be simple JSON objects. This is because
they should be serializable and replayable into the application state. Even if
your actions involve asynchronous logic, the final dispatched action should 
remain a plain JSON object.

Redux action creators are generally where side-effects should happen, such as
making API calls or generating IDs. This is because when the final action gets
dispatched to the reducers, we want to update the application state to reflect
what has already happened.

Let's take a look at the actions that are used in this example. For now, let's
just focus on some simple synchronous actions.

## Synchronous Actions

Most Redux apps have a set of functions, called "action creators", that are
used to set up and dispatch actions.

In Angular 2, it's convenient to define "action creator services" for your
action creators to live in; these services can be injected into the components
that need to dispatch the actions.

_app/actions/counter-actions.ts_
```javascript
import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

@Injectable()
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

As you can see, the action creators are simple functions that (optionally)
take parameters, and then dispatch a JSON object containing more information.

The `dispatch` function expects to be called with something that conforms to
the "Action" interface from the Redux library:

```typescript
import { Action } from 'redux';
```

This interface has the following properties:

* _type_ - a string/enum representing the action
* _payload?_ - optional, the data that you want to pass into the reducer if applicable
* _error?_ - optional, indicates if this message is due to an error
* _metaData?_ - optional - any extra information

## Asynchronous Actions

This "ActionCreatorService" pattern comes in handy if you must handle
asynchronous or conditional actions (users of react-redux may recognize this
pattern as analogous to redux-thunk in a dependency-injected world).

_app/actions/counter-actions.ts_
```typescript
import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

@Injectable()
export class CounterActions {
  constructor(private redux: NgRedux<any>) {}

  // ...

  incrementIfOdd() {
    const { counter } = this.redux.getState();

    if (counter % 2 === 0) return;
    this.redux.dispatch({ type: INCREMENT_COUNTER });
  }

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

In the `incrementIfOdd` action, we are using the `getState` function to
get the current state of the application.

In the `incrementAsync` action, we are delaying the actual call to `dispatch`.
For example, we have created a Promise that will resolve after the delay. Once
the Promise resolves, we can then do a dispatch with the increase action.

[View Example](https://plnkr.co/edit/Ck0SngT4GKWVdv4MSevs?p=preview)

## Actions that Depend on Other Services

The ActionCreatorService pattern becomes necessary in cases where your action
creators must use other Angular 2 services. Consider the following
ActionCreatorService that handles a remote API call:

```typescript
import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AuthService } from '../services/auth/';

@Injectable()
export class SessionActions {
  static LOGIN_USER_PENDING = 'LOGIN_USER_PENDING';
  static LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
  static LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
  static LOGOUT_USER = 'LOGOUT_USER';

  constructor(
    private ngRedux: NgRedux<any>,
    private authService: AuthService) {}

  loginUser(credentials) {
    const username = credentials.username;
    const password = credentials.password;

    this.ngRedux.dispatch({ type: SessionActions.LOGIN_USER_PENDING });

    this.authService.login(username, password)
      .then(result => this.ngRedux.dispatch({
          type: SessionActions.LOGIN_USER_SUCCESS,
          payload: result
      }))
      .catch(() => this.ngRedux.dispatch({
        type: SessionActions.LOGIN_USER_ERROR
      }));
  };

  logoutUser = () => {
    this.ngRedux.dispatch({ type: SessionActions.LOGOUT_USER });
  };
}
```
