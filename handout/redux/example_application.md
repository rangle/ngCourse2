# Example Application

In this section, we'll be creating a simple counter application, which allows 
the user to increment and decrement a number by one, as well as reset that value
back to zero. Here's the `AppState` that we'll be using throughout this example:

_src/models/appState.ts_
```typescript
import {Counter} from './counter';

export interface AppState {
  readonly counter: Counter;
}
```

_src/models/counter.ts_
```typescript
export interface Counter {
  readonly currentValue: number;
}
```

> It's a good practice to declare each interface in its own file, or create a
logical directory structure if you have seven or more interfaces used by your
application.