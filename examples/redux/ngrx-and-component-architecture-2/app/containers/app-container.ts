import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Counter } from '../components/counter-component';
import { CounterActions } from '../actions/counter-actions';
import { CurseActions } from '../actions/curse-actions';
import logger from '../store/configure-logger';
import reducer from '../reducers/index';

@Component({
  selector: 'simple-ngrx',
  providers: [ CounterActions, CurseActions ],
  directives: [ Counter ],
  template: `
  <div>
    <h1>Ngrx: Presentational Counters</h1>
    <div style="float: left; border: 1px solid red;">
      <h2>Click Counter</h2>
      <counter [counter]="counter$"
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
export class SimpleNgrx {
  counter$: Observable<number>;
  curse$: Observable<number>;

  constructor(
    private counterActions: CounterActions,
    private curseActions: CurseActions,
    store: Store) {
      this.counter$ = store.select('counter');
      this.curse$ = store.select('curse');
    }
}
