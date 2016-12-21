# Reading your Application State using Selectors

_/app/services/counter.service.ts_
```typescript
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

import {AppState} from '../models';

@Injectable()
export class CounterService {

  constructor(private store: Store<AppState>) {

  }

  getCounter() {
    return this.store.select(appState => appState.counter)
      .filter(counter => Boolean(counter));
  }

}
```