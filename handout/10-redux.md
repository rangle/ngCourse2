<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


  - [Part 10: Angular 2 and Redux](#part-10-angular-2-and-redux)
  - [What is Redux](#what-is-redux)
    - [Resources](#resources)
  - [Quick Review of Reducers and Pure Functions](#quick-review-of-reducers-and-pure-functions)
  - [Redux Reducers](#redux-reducers)
  - [Simple Reducer](#simple-reducer)
  - [Redux Actions](#redux-actions)
    - [Synchronous Actions](#synchronous-actions)
    - [Asynchronous Actions](#asynchronous-actions)
  - [Configuring your Application to use Redux](#configuring-your-application-to-use-redux)
    - [Create our application reducer](#create-our-application-reducer)
    - [Create and configure a store](#create-and-configure-a-store)
    - [Register the provider with Angular 2](#register-the-provider-with-angular-2)
  - [Using Redux with Components](#using-redux-with-components)
  - [Counter Example](#counter-example)
  - [Redux and Component Architecture](#redux-and-component-architecture)
- [Simple Redux](#simple-redux)
- [Redux: Dumb Counter](#redux-dumb-counter)


<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Part 10: Angular 2 and Redux ##

## What is Redux

Redux is an application state manager for JavaScript applications, and keeps with the core prinicpals of flux-architecture by having a unidirectional data flow in your application.

How it differs from traditional Flux though, is that instead of multipul stores, you have one global application state. The state is calculated and returned in the reducer. The state management is held elsewwhere.

### Resources

* [Redux Documentation](http://redux.js.org/)
* [NG2-Redux - Angular 2 Bindings for Redux](https://github.com/wbuchwalter/ng2-redux)
* [Angular 2 Redux Starter Kit](https://github.com/rangle/angular2-redux-starter)
* [Getting Started with Redux - Egghead.io](https://egghead.io/series/getting-started-with-redux)

## Quick Review of Reducers and Pure Functions

One of the core concepts of Redux is the reducer. A reducer is simply a function that iterates over a collection of values, and returns a new single value at the end of it.

The simplest examples of a reducer, is a sum function:

```javascript
let x = [1,2,3].reduce((value,state)=>value+state,0)
// x == 6 
```

## Redux Reducers

While a very simple idea, it is very powerful. With Redux, you replay a series of events into the reducer - and get your new application state as a result.

Reducers in a Redux application should not mutate the state, but return a copy of it, and be side-effect free. Lets take a look at a simple counter reducer.

## Simple Reducer

__app/reducer/counter-reducer.ts__
```ts
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

We can see here that we are passing in an initial state, and an action. To handle each action - we have setup a switch statement. Instead of each reducer needing to explcitly subscribe to the dispatcher - every action gets passed into every reducer, handles the action it is interested in, and otherwise returns the state along to the next reducer.

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


## Redux Actions

Redux actions, generally should return a simple JSON object. This is because they should be serialized and replayable into the application state. Even if your actions need to return promises, the final dispatched action should remain a plain JSON object.

Redux actions are generally where side-effects should happen, such as making API calls, or generating ID's. This is because when the final action gets dispatched to the reducers, we want to update the applicaton state to reflect what has already happened. 

Lets take a look at the actions that are used in this example. For now, lets just focus on the synchronous actions.

### Synchronous Actions

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

### Asynchronous Actions

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

## Using Redux with Components

When using ng2-redux, to connect it up with your angular components you need to use the `ngRedux.connect`. To demonstrate how this works, lets take a look at a small counter example.
 
## Counter Example
 
 To see how `ng2-redux` works with Angular 2, lets start by building out a counter component. The component will be responsible for keeping track of how many times it was clicked, and displaying the amount.
 
 __app/components/counter-component.ts__
 ```ts
 import {Component, View, Inject} from 'angular2/core';
import {bindActionCreators} from 'redux';
import * as CounterActions from '../actions/counter-actions';
@Component({
  selector: 'counter',
  properties: [],
  template: `
  <p>
    Clicked: {{ counter }} times
    <button (click)="increment()">+</button>
    <button (click)="decrement()">-</button>
    <button (click)="incrementIfOdd()">Increment if odd</button>
    <button (click)="incrementAsync()">Increment async</button>
  </p>
  `
})
export class Counter {
   protected unsubscribe: Function;

  constructor( @Inject('ngRedux') private ngRedux) {

  }

  ngOnInit() {
    
    this.unsubscribe = this.ngRedux.connect(
      this.mapStateToThis,
      this.mapDispatchToThis)(this);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  mapStateToThis(state) {
    
    return {
      counter: state.counter
    };
  }

  mapDispatchToThis(dispatch) {
    return bindActionCreators(CounterActions, dispatch);
  }
}
 
 ```
 [View Example](http://plnkr.co/edit/Zlti4BiAVM750Dk4YNbU?p=preview)
 
 The template syntax should be familiar by now, displaying a counter value, and handling some click events. Lets take a look at the use of `ngRedux.connect`.
 
* `mapStateToTarget` \(*Function*): connect will subscribe to Redux store updates. Any time it updates, mapStateToTarget will be called. Its result must be a plain object, and it will be merged into `target`. If you have a component which simply triggers actions without needing any state you can pass null to `mapStateToTarget`.
* [`mapDispatchToTarget`] \(*Object* or *Function*): Optional. If an object is passed, each function inside it will be assumed to be a Redux action creator. An object with the same function names, but bound to a Redux store, will be merged onto `target`. If a function is passed, it will be given `dispatch`. It’s up to you to return an object that somehow uses `dispatch` to bind action creators in your own way. (Tip: you may use the [`bindActionCreators()`](http://gaearon.github.io/redux/docs/api/bindActionCreators.html) helper from Redux.).

*You then need to invoke the function a second time, with `target` as parameter:*
* `target` \(*Object* or *Function*): If passed an object, the results of `mapStateToTarget` and `mapDispatchToTarget` will be merged onto it. If passed a function, the function will receive the results of `mapStateToTarget` and `mapDispatchToTarget` as parameters.
 [ng2-redux docs](https://github.com/wbuchwalter/ng2-redux/blob/master/README.md#arguments-1)
 
 In our above example, our `mapStateToThis` function, is getting the property `counter` from the state, and assigning it to the class. The mapDispatchToThis, is taking all of the exported functions from `CounterActions`, and adding them to the Counter class, so `increment`, `decrement`, `incrementIfOdd`, and `incrementAsync` are available.
 
 
 
## Redux and Component Architecture
 
 In the above example, our `counter` component is a smart component. It knows about redux, the structure of the state, and the actions it needs to call. While in theory you can drop this component into any area of your application and have it just work. But, it will be tightly bound to that specific slice of state, and those specific actions. For example, what if we wanted to have multiple counters tracking different things on the page? For example, counting the number of red clicks vs blue clicks. 
 
 
 To help make components more generic and reusable, it is worth considering smart component, or container components - and dumb components. 
 
 
 <table>
    <thead>
        <tr>
            <th></th>
            <th scope="col" style="text-align:left">Container Components</th>
            <th scope="col" style="text-align:left">Presentational Components</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <th scope="row" style="text-align:right">Location</th>
          <td>Top level, route handlers</td>
          <td>Middle and leaf components</td>
        </tr>
        <tr>
          <th scope="row" style="text-align:right">Aware of Redux</th>
          <td>Yes</th>
          <td>No</th>
        </tr>
        <tr>
          <th scope="row" style="text-align:right">To read data</th>
          <td>Subscribe to Redux state</td>
          <td>Read data from props</td>
        </tr>
        <tr>
          <th scope="row" style="text-align:right">To change data</th>
          <td>Dispatch Redux actions</td>
          <td>Invoke callbacks from props</td>
        </tr>
    </tbody>
</table>

[redux docs](http://redux.js.org/docs/basics/UsageWithReact.html)
 
 Keeping this in mind, lets refactor our `counter` to be a **dumb/presentational** component.  First, lets modify our `app-container` to have two counter components on it as we currently have it.
 
 ```ts
 import {Component, View, Inject, OnDestroy, OnInit} from 'angular2/core';
import {Counter} from '../components/counter-component';

@Component({
	selector: 'simple-redux',
	directives: [Counter]
	template: `<div>
	<h1>Simple Redux</h1>
<div style="float: left; border: 1px solid red;">
<h2>Click Counter</h2>
	<counter>
  </counter>
</div>
<div style="float: left; border: 1px solid blue;">
<h2>Curse Counter</h2>
	<counter>
  </counter>
</div>
	`
})

export class SimpleRedux {
  
}
```
[View Example](http://plnkr.co/edit/Ks2oOcHhOJum6pO41qNU?p=preview)

As you can see in the example, when clicking on the buttons - the numbers in both components will update in sync. This is because counter component is coupled to a specific piece of state, and action.

Looking at the example, you can see that there is already an __app/reducers/curse-reducer.ts__, and __app/actions-curse-actions.ts__, this is pretty much the same as the counter actions and counter reducer, we just wanted to create a new reducer to hold the state of it.

To turn the counter component from a smart component into a dumb component, we need to change it to have data and callbacks passed down into it. For this, we will pass the properties into the component, as well as remove the body of the counter class, as it no longer needs to be aware about redux.

__app/components/counter-component.ts__
```ts
import {Componentt} from 'angular2/core';

@Component({
  selector: 'counter',
  properties: [`counter`, `increment`, `decrement`,`incrementIfOdd`,`incrementAsync`],
  template: `
  <p>
    Clicked: {{ counter }} times
    <button (click)="increment()">+</button>
    <button (click)="decrement()">-</button>
    <button (click)="incrementIfOdd()">Increment if odd</button>
    <button (click)="incrementAsync()">Increment async</button>
  </p>
  `
})
export class Counter {
 
}
```

Next, lets modify the main app container to pass down the appropiate data to each component.

`@Component`
__app/src/containers/app-containter.ts__
```ts
@Component({
	selector: 'simple-redux',
	directives: [Counter]
	template: `<div>
	<h1>Redux: Dumb Counter</h1>
<div style="float: left; border: 1px solid red;">
<h2>Click Counter</h2>
 <counter [counter]="counter"
    [increment]="increment"
    [decrement]="decrement"
    [incrementIfOdd]="incrementIfOdd"
    [incrementAsync]="incrementAsync">
  </counter>

</div>
<div style="float: left; border: 1px solid blue;">
<h2>Curse Counter</h2>
 <counter [counter]="curse"
    [increment]="castCurse"
    [decrement]="removeCurse"
    [incrementIfOdd]="castIfOdd"
    [incrementAsync]="castAsync">
  </counter>
</div>
	`
})
```

Here, we are now explicitly passing in the data and callbacks that each of these components needs to use. Next, we update the container class so that we can use ngRedux to get the correct sections of state, and actions to pass into the counter component.

__app/src/containers/app-container.ts__
```ts
import {Component, View, Inject, OnDestroy, OnInit} from 'angular2/core';
import {Counter} from '../components/counter-component';
import {Component, View, Inject, OnDestroy, OnInit} from 'angular2/core';
import {bindActionCreators} from 'redux';
import * as CounterActions from '../actions/counter-actions';
import * as CurseActions from '../actions/curse-actions';

@Component({ /* see above .... */})
export class SimpleRedux {
  protected unsubscribe: Function;

  constructor( @Inject('ngRedux') private ngRedux) {

  }

  ngOnInit() {
    this.unsubscribe = this.ngRedux.connect(
      this.mapStateToThis,
      this.mapDispatchToThis)(this);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  mapStateToThis(state) {
    return { counter, curse } = state;
  }

  mapDispatchToThis(dispatch) {
    let actions = Object.assign({},CounterActions, CurseActions);
    return bindActionCreators(actions, dispatch);
  }
}
```
[View Example](http://plnkr.co/edit/8eq54QwOcYDuxzcBdMV3?p=preview)

Since we are getting actions from both `CounterActions` and `CurseActions`, we are merging them into one object to be bound onto the SimpleRedux class. Depending on how the components are being used, and how generic they need to be. You could potentially create a container component for each one of your dumb components, although this might not always be required. But, for sake of this example - lets do one last refactor of this counter component, and create a `ClickContainer`, and a `CurseContainer`.

__app/containers/curse-container.ts__
```ts
import {Component, View, Inject, OnDestroy, OnInit} from 'angular2/core';
import {Counter} from '../components/counter-component';
import {Component, View, Inject, OnDestroy, OnInit} from 'angular2/core';
import {bindActionCreators} from 'redux';

import * as CurseActions from '../actions/curse-actions';

@Component({
	selector: 'curse-counter',
	directives: [Counter]
	template: `
	
<div style="float: left; border: 1px solid blue;">
<h2>Curse Counter</h2>
 <counter [counter]="curse"
    [increment]="castCurse"
    [decrement]="removeCurse"
    [incrementIfOdd]="castIfOdd"
    [incrementAsync]="castAsync">
  </counter>
</div>
	`
})

export class CurseContainer {
  protected unsubscribe: Function;

  constructor( @Inject('ngRedux') private ngRedux) {

  }

  ngOnInit() {
    this.unsubscribe = this.ngRedux.connect(
      this.mapStateToThis,
      this.mapDispatchToThis)(this);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  mapStateToThis(state) {
    return { curse } = state;
  }

  mapDispatchToThis(dispatch) {
    
    
    return bindActionCreators(CurseActions, dispatch);
  }
}
``` 
 
 The __app/containers/click-container.ts__ is almost the same, except importing click actions and state. Then, we can update the application container.
 
 __app/containers/app-container.ts__
 ```ts
import {Component, View, Inject, OnDestroy, OnInit} from 'angular2/core';
import {ClickContainer} from './click-container.ts';
import {CurseContainer} from './curse-container.ts';

import {Component, View, Inject, OnDestroy, OnInit} from 'angular2/core';


@Component({
	selector: 'simple-redux',
	directives: [CurseContainer, ClickContainer]
	template: `<div>
	<h1>Redux: Dumb Counter</h1>
  <click-counter></click-counter>
  <curse-counter></curse-counter>
  <curse-counter></curse-counter>
</div>

	`
})
 export class SimpleRedux {
  
}
 ```
 [View Example](http://plnkr.co/edit/wWqv7C1HD21mbBZvcdcl?p=preview)
 
 Creating a smart container for every component may not always be necessary as a larger part of your application could be acting as the smart container as it did in the initial example.
 
 


