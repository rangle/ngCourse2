# Create your Application's Root Reducer

Ngrx allows us to break our application into smaller reducers
with a single area of concern. Each reducer that you pass into it will correlate to a
property on your applications `IAppState`.

_app/state/rootReducer.ts_
```typescript
import {counterReducer} from './counter/counter.reducer';

export const rootReducer = {
  counter: counterReducer
};
```