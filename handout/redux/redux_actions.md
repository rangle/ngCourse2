# Redux Actions

Redux actions, generally should return a simple JSON object. This is because they should be serialized and replayable into the application state. Even if your actions need to return promises, the final dispatched action should remain a plain JSON object.

Redux actions are generally where side-effects should happen, such as making API calls, or generating ID's. This is because when the final action gets dispatched to the reducers, we want to update the application state to reflect what has already happened.

Lets take a look at the actions that are used in this example. For now, lets just focus on the synchronous actions.

## Synchronous Actions

__app/actions/counter-actions.ts__
```js
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

As you can see, the actions creators are simple functions that take parameters, and return a JSON object containing more information. The typical Redux action tends to contain the properties:

* **type**: a string/enum representing the action
* **payload**: the data that you want to pass into the reducer if applicable
* **error?** : optional, indicates if this message is due to an error
* **metaData?** : optional - any extra information

When using Redux, libraries like ng2-redux will take care of wrapping your actions into the dispatch so they will get passed off to the store appropriately.

## Asynchronous Actions

To do async operations, or have actions that return something other than a plain JSON object, you need to register a middleware with redux. For our examples, we can use the `thunk` middleware, and setting this up is covered later in the training. For now, all you need to know is that once you register a middleware with redux, you can make `dispatch` and `getState` available to your actions. To show how these are used, lets take a look at the `incrementIfOdd` and `increaseAsync` actions.

__app/actions/counter-actions.ts__
```js
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
