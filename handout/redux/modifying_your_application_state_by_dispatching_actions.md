# Modifying your Application State by Dispatching Actions

Most Redux apps have a set of functions, called "action creators", that are
used to set up and dispatch actions.

In Angular, it's convenient to define your action creators as `@Injectable()` 
services, decoupling the dispatch, creation and side-effect logic from the 
`@Component` classes in your application.

## Synchronous Actions

Here is a simple example:

_app/store/counter/counter.actions.ts_
```typescript
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

import {createAction} from '../createAction';
import {AppState} from '../../models/appState';

@Injectable()
export class CounterActions {

  static INCREMENT = 'INCREMENT';
  static DECREMENT = 'DECREMENT';
  static RESET = 'RESET';

  constructor(private store: Store<AppState>) {

  }

  increment() {
    this.store.dispatch(createAction(CounterActions.INCREMENT));
  }

  decrement() {
    this.store.dispatch(createAction(CounterActions.DECREMENT));
  }

  reset() {
    this.store.dispatch(createAction(CounterActions.RESET));
  }
  
}
```

As you can see, the action creators are simple functions that dispatch `Action` 
objects containing more information that describes the state modification.

## Asynchronous Actions

This "ActionCreatorService" pattern comes in handy if you must handle
asynchronous or conditional actions (users of react-redux may recognize this
pattern as analogous to redux-thunk in a dependency-injected world).

_app/store/counter/counter.actions.ts_
```typescript
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

import {createAction} from '../createAction';
import {AppState} from '../../models/appState';


@Injectable()
export class CounterActions {
  
  constructor(private store: Store<AppState>) {

  }

  incrementIfOdd() {
    this.store.select(appState => appState.counter.currentValue)
      .take(1)
      .subscribe(currentValue => {
        if (currentValue % 2 !== 0) {
          this.store.dispatch(createAction(CounterActions.INCREMENT);
        }
      });
  }

  incrementAsync(timeInMs: number = 1000) {
    this.delay(timeInMs).then(() => this.store.dispatch(createAction(CounterActions.INCREMENT)));
  }

  private delay(timeInMs: number) {
    return new Promise((resolve) => {
      setTimeout(() => resolve() , timeInMs);
    });
  }
  
}
```

In the `incrementIfOdd()` action creator, we created a one-time 
subscription to the counter's `currentValue` in the application state. From 
there, we check to see if it's odd before dispatching an action.

In the `incrementAsync()` action creator, we are delaying the actual call to 
`dispatch()`. We created a `Promise` that will resolve after the delay. Once
the `Promise` resolves, we can then dispatch an action to increment the counter.

## Actions that Depend on Other Services

The ActionCreatorService pattern becomes necessary in cases where your action
creators must use other Angular services. Consider the following
`SessionActions` service that handles a remote API call:

```typescript
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

import {createAction} from '../createAction';
import {AppState} from '../../models/appState';

@Injectable()
export class SessionActions {
  
  static LOGIN_USER_PENDING = 'LOGIN_USER_PENDING';
  static LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
  static LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
  static LOGOUT_USER = 'LOGOUT_USER';

  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {
    
  }

  loginUser(credentials: any) {
    this.store.dispatch(createAction(SessionActions.LOGIN_USER_PENDING));

    this.authService.login(credentials.username, credentials.password)
      .then(result => this.store.dispatch(createAction(SessionActions.LOGIN_USER_SUCCESS, result)))
      .catch(() => this.store.dispatch(createAction(SessionActions.LOGIN_USER_ERROR)));
  };

  logoutUser() {
    this.store.dispatch(createAction(SessionActions.LOGOUT_USER));
  };
  
}
```
