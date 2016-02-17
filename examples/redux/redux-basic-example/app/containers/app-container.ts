import {Component, View, Inject, OnDestroy, OnInit} from 'angular2/core';
import {bindActionCreators} from 'redux';
import {Counter} from '../components/counter-component';
import * as CounterActions from '../actions/counter-actions';
@Component({
	selector: 'simple-redux',
	directives: [Counter]
	template: `<div>
	<h1>Simple Redux</h1>
	<counter [counter]="counter"
    [increment]="increment"
    [decrement]="decrement"
    [incrementIfOdd]="incrementIfOdd"
    [incrementAsync]="incrementAsync">
  </counter>
</div>
	`
})

export class SimpleRedux {
  protected unsubscribe: Function;

  constructor( @Inject('ngRedux') private ngRedux) {

  }

  ngOnInit() {
    console.log('ngOnInit!')
    this.unsubscribe = this.ngRedux.connect(
      this.mapStateToThis,
      this.mapDispatchToThis)(this);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  mapStateToThis(state) {
    console.log('mapState',state)
    return {
      counter: state.counter
    };
  }

  mapDispatchToThis(dispatch) {
    return bindActionCreators(CounterActions, dispatch);
  }
}