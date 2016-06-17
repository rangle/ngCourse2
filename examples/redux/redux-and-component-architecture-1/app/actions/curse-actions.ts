import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

export const CAST_CURSE = 'CAST_CURSE';
export const REMOVE_CURSE = 'REMOVE_CURSE';

@Injectable()
export class CurseActions {
  constructor(private redux: NgRedux<any>) {}

  castCurse() {
    this.redux.dispatch({ type: CAST_CURSE });
  }

  removeCurse() {
    this.redux.dispatch({ type: REMOVE_CURSE });
  }
  
  castIfOdd() {
    const { counter } = this.redux.getState();

    if (counter % 2 === 0) return;
    this.redux.dispatch({ type: CAST_CURSE });
  }

  castAsync(timeInMs = 1000) {
    this.delay(timeInMs).then(() => this.redux.dispatch({ type: CAST_CURSE }));
  }

  private delay(timeInMs) {
    return new Promise((resolve,reject) => {
      setTimeout(() => resolve() , timeInMs);
    });
  }
}