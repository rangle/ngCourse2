# Redux and Component Architecture

In the above example, our `counter` component is a smart component. 
It knows about Redux, the structure of the state, and the actions it needs to call. 
In theory you can drop this component into any area of your application and just let it work. 
But it will be tightly bound to that specific slice of state, and those specific actions. 
For example, what if we wanted to have multiple counters tracking different things on the page? 
For example, counting the number of red clicks vs blue clicks.

To help make components more generic and reusable, it's worth trying to separate
them into _container_ components and _presentational_ components.

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
          <td>Read state from @Input properties</td>
        </tr>
        <tr>
          <th scope="row" style="text-align:right">To change data</th>
          <td>Dispatch Redux actions</td>
          <td>Invoke callbacks from @Output properties</td>
        </tr>
    </tbody>
</table>

[redux docs](http://redux.js.org/docs/basics/UsageWithReact.html)

 Keeping this in mind, let's refactor our `counter` to be a _presentational_
 component.  First, let's modify our `app-container` to have two counter
 components on it as we currently have it.

```javascript
import { Component } from '@angular/core';
import { Counter } from '../components/counter-component';

@Component({
  selector: 'simple-redux',
  directives: [ Counter ]
  template: `
    <div>
      <h1>Redux: Two components, one state.</h1>
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
    </div>
  `
})
export class SimpleRedux {}
```
[View Example](https://plnkr.co/edit/VNNeYwHjucdlMIIA92US?p=preview)

As you can see in the example, when clicking on the buttons the numbers in both components will update in sync. 
This is because the counter component is coupled to a specific piece of state and action.

Looking at the example, you can see that there is already an _app/reducers/curse-reducer.ts_, and _app/actions-curse-actions.ts_. 
They are pretty much the same as the counter actions and counter reducer, 
we just wanted to create a new reducer to hold the state of it.

To turn the counter component from a smart component into a dumb component, 
we need to change it to have data and callbacks passed down into it. 
For this, we will pass the data into the component using `@Input` properties, 
and the action callbacks as `@Output` properties.

We now have a nicely-reusable presentational component with no knowledge of
Redux or our application state.

_app/components/counter-component.ts_
```javascript
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'counter',
  template: `
  <p>
    Clicked: {{ counter$ | async }} times
    <button (click)="increment.emit()">+</button>
    <button (click)="decrement.emit()">-</button>
    <button (click)="incrementIfOdd.emit()">Increment if odd</button>
    <button (click)="incrementAsync.emit()">Increment async</button>
  </p>
  `
})
export class Counter {
  @Input() counter$: Observable<number>;
  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();
  @Output() incrementIfOdd = new EventEmitter<void>();
  @Output() incrementAsync = new EventEmitter<void>();
}
```

Next, let's modify the main app container to hook up these inputs and outputs
to the template.

`@Component`
_app/src/containers/app-containter.ts_
```typescript
@Component({
  selector: 'simple-redux',
  providers: [ CounterActions, CurseActions ],
  directives: [ Counter ],
  template: `
  <div>
    <h1>Redux: Presentational Counters</h1>
    <div style="float: left; border: 1px solid red;">
      <h2>Click Counter</h2>
      <counter [counter$]="counter$"
          (increment)="counterActions.increment()"
          (decrement)="counterActions.decrement()"
          (incrementIfOdd)="counterActions.incrementIfOdd()"
          (incrementAsync)="counterActions.incrementAsync()">
      </counter>
    </div>
    <div style="float: left; border: 1px solid blue;">
      <h2>Curse Counter</h2>
      <counter [counter]="curse$"
          (increment)="curseActions.castCurse()"
          (decrement)="curseActions.removeCurse()"
          (incrementIfOdd)="curseActions.castIfOdd()"
          (incrementAsync)="curseActions.castAsync()">
      </counter>
    </div>
  </div>
	`
})
```

At this point, the template is attempting to call actions on our two
ActionCreatorServices, `CounterActions` and `CurseActions`; we just need to hook
those up using Dependency Injection:

_app/src/containers/app-container.ts_
```typescript
import { Component, View, Inject, OnDestroy, OnInit } from '@angular/core';
import { select } from 'ng2-redux';
import { Counter } from '../components/counter-component';
import { CounterActions } from '../actions/counter-actions';
import { CurseActions } from '../actions/curse-actions';

@Component({ /* see above .... */})
export class SimpleRedux {
  @select() counter$: Observable<number>;
  @select() curse$: Observable<number>;

  constructor(
    private counterActions: CounterActions,
    private curseActions: CurseActions,
    redux: NgRedux) {
      const initialState = {};
      const middleware = [ logger ];
      redux.configureStore(reducer, initialState, middleware);
    }
}
```
[View Example](https://plnkr.co/edit/m910XrXyFrUty2nXUJ1q?p=preview)

Our two `Observable`s, `counter$` and `curse$` will now get updated with a new
value every time the relevant store properties are updated by the rest of the
system.
