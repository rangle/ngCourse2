# Redux and Component Architecture
 
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