# Redux Actions

Redux actions, generally should return a simple JSON object. This is because they should be serialized and replayable into the application state. Even if your actions need to return promises, the final dispatched action should remain a plain JSON object.

Redux actions are generally where side-effects should happen, such as making API calls, or generating ID's. This is because when the final action gets dispatched to the reducers, we want to update the applicaton state to reflect what has already happened. 

Lets take a look at the actions that are used in this example. For now, lets just focus on the synchronous actions.

## Synchronous Actions

__app/actions/counter-actions.ts__
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

```
[View Example](http://plnkr.co/edit/ra37zSP4sac6hyoZXyWe?p=preview)

As you can see, the actions creators are simple functions that take paramaters, and return a JSON object containing more information. The typical Redux action tends to contain the properties:

* **type**: a string/enum representing the action
* **payload**: the data that you want to pass into the reducer if applicable
* **error?** : optional, indicates if this message is due to an error
* **metaData?** : optional - any extra information 

When using Redux, libraries lke ng2-redux will take care of wrapping your actions into the dispatch so they will get passed off to the store appropriately.

## Asynchronous Actions

To do async operations, or have actions that return something other than a plain JSON object, you need to register a middleware with redux. For our examples, we can use the `thunk` middleware, and setting this up is covered later in the training. For now, all you need to know is that once you register a middleware with redux, you can make `dispatch` and `getState` available to your actions. To show how these are used, lets take a look at the `incrementIfOdd` and `increaseAsync` actions.

__app/actions/counter-actions.ts__
```ts
// ... 
export function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

const delay = (timeInMs) => {
  return new Promise((resolve,reject) => {
    setTimeout(() => resolve() , timeInMs);
  });
}

export function incrementAsync(timeInMs = 1000) {
  return dispatch => {
    delay(timeInMs).then(() => dispatch(increment()));
  };
}
```
[View Example](http://plnkr.co/edit/ra37zSP4sac6hyoZXyWe?p=preview)

In the `incrementIfOdd` action, we are making use of the getState function to get the current state of the application. 

In the `incrementAsync` action, we are making use of dispatch. For example, we have created a Promise that will resolve after the delay. Once the Promise resolves, we can then do a dispatch with the increase action. However, this promise could also be an API call, with the dispatched action containing the result of the API call.

## Configuring your Application to use Redux

Once you have the reducers and actions created, it is time to configure your Angular 2 application to make use of ng2-redux. For this, we will need to: -

* Create our application reducer
* Create and configure a store
* Register the provider with Angular 2

### Create our application reducer

__app/reducers/index.ts__
```ts
import { combineReducers } from 'redux';
import counter from './counter-reducer';

export default  combineReducers({
  counter
});
```

What `combineReducers` does, is allows us to break out our application into smaller reducers with a single area of concern. Each reducer that you pass into it, will become a property on the state. So when we ar subscribing to our state changes with `ngRedux.connect`, we will be passed in a state object with a property counter, and any other reducers you have provided.

### Create and configure a store

When creating a store in redux, this is where you provide the middleware you want to use, and the reducer that you want to have for your application.

__app/store/configure-store.ts__
```ts
import {createStore, applyMiddleware, compose} from 'redux';
import logger from './configure-logger';
import thunk from 'redux-thunk';
import reducer from '../reducers/index'

let middleware: Array<any> = [thunk, logger];

const finalCreateStore = compose(
  applyMiddleware(...middleware)
)(createStore);

export default () => {
  return finalCreateStore(reducer);
}

```

In this example, we are creating a store that is using the `thunk` middleware, which will allow our actions to return non-JSON objects such as promises, and `redux-logger`, which will add some logging functionality to the application.

### Register the provider with Angular 2

Now that we have created our state reducer, and created a store. We now need to tell Angular 2 to use the provider, so that we will be able to inject `ngRedux` into our components.

__app/boot.ts__
```ts
import {bootstrap}    from 'angular2/platform/browser'
import {SimpleRedux} from './containers/app-container'
import {ROUTER_PROVIDERS} from 'angular2/router';
import {provide} from 'angular2/core';
import {LocationStrategy, Location, HashLocationStrategy } from 'angular2/router';
import configureStore from './store/configure-store';
import * as ng2redux from 'ng2-redux'
const store = configureStore();

bootstrap(SimpleRedux,
  [ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  ng2redux.provider(store)
]);

```

