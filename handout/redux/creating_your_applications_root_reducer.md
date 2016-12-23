# Creating your Application's Root Reducer

Ngrx allows us to break our application into smaller reducers with a single 
area of concern. We can combine these reducers by creating an object that 
mirrors the application's `AppState`, where each property will point to one of
those smaller reducers.

_app/state/rootReducer.ts_
```typescript
import {counterReducer} from './counter/counter.reducer';

export const rootReducer = {
  counter: counterReducer
};
```