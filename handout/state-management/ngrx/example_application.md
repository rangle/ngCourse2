# Example Application

In this chapter, you'll be creating a simple counter application using 
[@ngrx](https://github.com/ngrx). Your app will allow users to increment and 
decrement a number by one, as well as reset that value back to zero. Here's the 
`AppState` that we'll be using throughout the example:

_app/models/appState.ts_
```typescript
import {Counter} from './counter';

export interface AppState {
  readonly counter: Counter;
}
```

_app/models/counter.ts_
```typescript
export interface Counter {
  readonly currentValue: number;
}
```

> It's good practice to declare each interface in its own file, and create a
logical directory structure if you have seven or more interfaces used by your
application.