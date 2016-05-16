import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {bindActionCreators} from 'redux';
import {Counter} from '../components/counter-component';
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