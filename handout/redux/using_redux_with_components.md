# Using Redux with Components

When using ng2-redux, to connect it up with your angular components you need to use the `ngRedux.connect`. To demonstrate how this works, lets take a look at a small counter example.
 
## Counter Example
 
 To see how `ng2-redux` works with Angular 2, lets start by building out a counter component. The component will be responsible for keeping track of how many times it was clicked, and displaying the amount.
 
 __app/components/counter-component.ts__

```javascript
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
 
 
 
