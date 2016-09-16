import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs';
import { CounterActions } from '../actions/counter-actions';

@Component({
	selector: 'simple-redux',
	providers: [ CounterActions ],
	template: `
	<div>
  	<h1>Simple Redux</h1>
  	<counter [counter]="counter$"
      (increment)="actions.increment()"
      (decrement)="actions.decrement()"
      (incrementIfOdd)="actions.incrementIfOdd()"
      (incrementAsync)="actions.incrementAsync()">
    </counter>
  </div>
	`
})
export class SimpleRedux {
  @select() counter$: Observable<number>;

  constructor(private actions: CounterActions) {
  }
}
