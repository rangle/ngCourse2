import {Component, View, Inject, OnDestroy, OnInit} from 'angular2/core';
import {Counter} from '../components/counter-component';
import {Component, View, Inject, OnDestroy, OnInit} from 'angular2/core';
import {bindActionCreators} from 'redux';

import * as CountActions from '../actions/counter-actions';

@Component({
	selector: 'click-counter',
	directives: [Counter]
	template: `
	
<div style="float: left; border: 1px solid red;">
<h2>Click Counter</h2>
 <counter [counter]="counter"
    [increment]="increment"
    [decrement]="decrement"
    [incrementIfOdd]="incrementIfOdd"
    [incrementAsync]="incrementAsync">
  </counter>
</div>
	`
})

export class ClickContainer {
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
    
    
    return bindActionCreators(CountActions, dispatch);
  }
}