# Define your Main Application State

The first thing to think about when building an application using Redux is, 
"What state do I want to store?" It is generally a good idea to capture all
of the application's state, such as:

* Data received through API calls
* Data submitted through forms
* Presentation state, such as menu and button toggles
* Application preferences, i18n Data, themes, and other customizable areas of your application

In the example application that we're going to build in this section, we'll be using the following
application state:

_src/models/appState.ts_
```typescript
import {Counter} from './counter';

export interface AppState {
  counter: Counter;
}
```

_src/models/counter.ts_
```typescript
export interface Counter {
  readonly currentValue: number;
}

```