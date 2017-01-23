# Creating your Application's Root Reducer

[@ngrx](https://github.com/ngrx) allows us to break our application into smaller 
reducers with a single area of concern. We can combine these reducers by 
creating an object that mirrors the application's `AppState`, where each 
property will point to one of those smaller reducers.

_app/store/rootReducer.ts_
```typescript
import {counterReducer} from './counter/counter.reducer';

export const rootReducer = {
  counter: counterReducer
};
```