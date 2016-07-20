import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterActions } from '../actions/counter-actions';
import { Counter } from '../components/counter-component';
import logger from '../store/configure-logger';
import reducer from '../reducers/index';

@Component({
	selector: 'simple-ngrx',
	directives: [ Counter ],
	providers: [ CounterActions ],
	template: `
	<div>
  	<h1>Simple Ngrx</h1>
  	<counter [counter]="counter$"
      (increment)="actions.increment()"
      (decrement)="actions.decrement()"
      (incrementIfOdd)="actions.incrementIfOdd()"
      (incrementAsync)="actions.incrementAsync()">
    </counter>
  </div>
	`
})
export class SimpleNgrx {
  counter$: Observable<number>;

  constructor(
    private store: Store<any>,
    private actions: CounterActions) {
    
    this.counter$ = store.select('counter');
  }
}
