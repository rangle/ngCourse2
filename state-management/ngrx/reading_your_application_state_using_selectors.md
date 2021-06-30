# Reading your Application State using Selectors

To read your application state in Redux, we need to use the `select()` method on [@ngrx's](https://github.com/ngrx/store) `Store` class. This method creates and returns an `Observable` that is bound to a specific property in your application state.

For example, here's how you would select the `counter` object:

```typescript
store.select('counter'); // Returns Observable<Counter>
```

And to fetch the counter's `currentValue`, we can pass in a `string` array, where each string plucks a single property from the application state one at a time in the order specified:

```typescript
store.select(['counter', 'currentValue']); // Returns Observable<number>
```

While `select()` allows for several variations of strings to be passed in, it has it's shortcomings - namely you won't actually know if the plucking is working properly until you execute your code.

Because of that, `select()` allows you to select values using functions too, which makes things more type-safe and your selectors will be more refactorable by your IDE.

```typescript
store.select(appState => appState.counter.currentValue);
```

## Creating a Counter Service

While you could inject `Store` and select values directly in your Angular components, it's considered to be a best practice to wrap this functionality into separate services. This approach encapsulates all of the selection logic and eliminates any duplication where the selection path is repeated throughout your application.

Let's tie everything together by building out a `CounterService` example:

_app/services/counter.service.ts_

```typescript
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {filter} from 'rxjs/operators';

import {AppState} from '../models';

@Injectable()
export class CounterService {

  constructor(private store: Store<AppState>) {}

  getCurrentValue(): Observable<number> {
    return this.store.select(appState => appState.counter.currentValue)
      .pipe(filter(Boolean))
  }

}
```

Because `select()` returns an `Observable`, the `getCurrentValue()` method also applies a `filter()` to ensure that subscribers do not receive any _falsy_ values. This greatly simplifies the code and templates in your components, since they don't have to repeatedly consider the falsy case everywhere the value is used.

