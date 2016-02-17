import {Component, View, Inject, OnDestroy, OnInit} from 'angular2/core';
import {Counter} from '../components/counter-component';
import {Component, View, Inject, OnDestroy, OnInit} from 'angular2/core';
import {bindActionCreators} from 'redux';
import * as CounterActions from '../actions/counter-actions';
import * as CurseActions from '../actions/curse-actions';

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
    
    let actions = Object.assign({}, CounterActions, CurseActions)
    
    return bindActionCreators(actions, dispatch);
  }
}