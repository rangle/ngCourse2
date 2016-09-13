import { Component } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs';
import { CounterActions } from '../actions/counter-actions';

@Component({
  selector: 'counter',
  providers: [ CounterActions ],
  template: `
  <p>
    Clicked: {{ counter$ | async }} times
    <button (click)="actions.increment()">+</button>
    <button (click)="actions.decrement()">-</button>
    <button (click)="actions.incrementIfOdd()">Increment if odd</button>
    <button (click)="actions.incrementAsync()">Increment async</button>
  </p>
  `
})
export class Counter {
  @select() counter$: Observable<number>;

  constructor(private actions: CounterActions) {}
}
