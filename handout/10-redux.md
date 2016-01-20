## Part 10: Angular 2 and Redux ##

## What is Redux

Redux is an application state manager for JavaScript applications, and keeps with the core prinicpals of flux-architecture by having a unidirectional data flow in your application.

How it differs from traditional Flux though, is that instead of multipul stores, you have one global application state. The state is calculated and returned in the reducer. The state management is held elsewwhere.


* [ ] TODO: Links/Resources to documentation

## Quick review of Reducers and Pure Functions

One of the core concepts of Redux is the reducer. A reducer is simply a function that iterates over a collection of values, and returns a new single value at the end of it.

One of the simplest examples of a reducer, is a sum function:

```javascript
let x = [1,2,3].reduce((value,state)=>value+state,0)
// x == 6 
```

## Redux Reducers

While a very simple idea, it is very powerful. With Redux, you replay a series of events into the reducer - and get your new application state as a result.

Reducers in a redux application should not mutate the state, but return a copy of it, and be side-effect free. Lets take a look at a simple counter reducer.

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

We can see here that we are passing in an initial state, and an action. To handle each action - we have setup a switch statement. Instead of each reducer needing to explcitly 'subscribe' to the dispatcher - every action gets passed into every reducer.
 

* [ ] Expand on reducers and how they apply to Redux, and managing application state
* [ ] Immutability in reducers
* [ ] Explain why reducers should be side-effect free 
* [X] Simple reducer 
    * [ ] unit test

## Redux Actions

Redux actions, generally should return a simple JSON object. This is because they should be seralizable and replayable into the application state. Even if your actions need to return promises, the final dispatched action should remain a plain JSON object.

* [ ] TODO: explain side effects,

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

When using Redux, libraries lke ng2-redux will take care of wrapping your actions into the dispatch so they will get passed off to the store appropriately.

### Asynchronous Actions


* [ ] TOOD: Expand on thunk/middleware 

* Actions/Action creaters
    * How the resulting dispatch should be a JSON object
    * Actions are where side-effects happen 
* Sync actions
    * create a simple sync action
    * unit testing sync actions
* Async actions
    * mention middleware, but don't go in depth
    * create simple async action?
    * unit testing async actions

## Configuring your Application to use Redux

* Setting up a store
* Configuring the provider
* Registering it with Angular 2

## Using Redux with Components

* Review of the ng2-redux connect api
    * explain mapStateToTarget
    * explain mapDispatchToTarget
 
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

Since we are getting actions from both `CounterActions` and `CurseActions`, we are merging them into one object to be bound onto the SimpleRedux class. Depending on how the components are being used, and how generic they need to be. You could potentially create a container component for each one of your dumb components, although this might not always be required. But, for sake of example - lets do one last refactor of this counter component, and create a `ClickContainer`, and a `CurseContainer`.

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
 
 Creating a smart container for every component may not always be nessicary, as a larger part of your application could be acting as the smart container as it did in the initial example.
 
## Redux - extra stuff
 
* TODO: Talk about re-select/selectors?
  
## Redux Tools
 
* TODO: Decide how far if at all we want to go here?
* Setting up Redux Logger

 



