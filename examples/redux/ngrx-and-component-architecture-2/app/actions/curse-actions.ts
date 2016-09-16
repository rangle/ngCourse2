import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

export const CAST_CURSE = 'CAST_CURSE';
export const REMOVE_CURSE = 'REMOVE_CURSE';

@Injectable()
export class CurseActions {
  constructor(private store: Store<any>) {}

  castCurse() {
    this.store.dispatch({ type: CAST_CURSE });
  }

  castIfOdd() {
    this.store.take(1)
      .subscribe(({ curse }) => {
        if (curse % 2 !== 0) {
          this.store.dispatch({ type: CAST_CURSE });
        }
      });
  }

  removeCurse() {
    this.store.dispatch({ type: REMOVE_CURSE });
  }

  castAsync(timeInMs = 1000) {
    this.delay(timeInMs).then(() => this.store.dispatch({ type: CAST_CURSE }));
  }

  private delay(timeInMs) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve() , timeInMs);
    });
  }
}
