import { Component } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs';
import { CounterActions } from '../actions/counter-actions';
import { CurseActions } from '../actions/curse-actions';

@Component({
  selector: 'simple-redux',
  providers: [ CounterActions, CurseActions ],
  template: `
  <div>
    <h1>Redux: Presentational Counters</h1>
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
export class SimpleRedux {
  @select() counter$: Observable<number>;
  @select() curse$: Observable<number>;

  constructor(
    private counterActions: CounterActions,
    private curseActions: CurseActions) {
    }
}
