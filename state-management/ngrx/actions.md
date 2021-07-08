# Actions

NgRx uses a concept called Actions (which if you have used Redux, you may be familiar with), which describe state changes to your application. Ngrx actions are simple JSON objects that implement the `Action` interface provided by [@ngrx](https://github.com/ngrx):

```typescript
export interface Action {
  type: string;
}
```

The `type` property is a string used to uniquely identify your action to your application. It's a common convention to use _lisp-case_ \(such as `MY_ACTION`\), however you are free to use whatever casing style that makes to your team, as long as it's consistent across the project.

Additionally, when you want to provide additional metadata in your action, your Action interface evolves into something like this:

```typescript
export interface Action {
  type: string;
  metaDataA: boolean;
  metaDataB: number;
}
```

Every additional property is entirely optional, and you can structure this metadata any way you want, for example using a payload key as a wrapper.

Here is an example:

```typescript
const loginSendAction: Action = {
  type: 'LOGIN_SEND',
  payload: {
    username: 'katie',
    password: '35c0cd1ecbbb68c75498b83c4e79fe2b'
  }
};
```

> Plain objects are used so that the actions are serializable and can be replayable into the application state. Even if your actions involve asynchronous logic, the final dispatched action will remain a plain JSON object.

To simplify action creation, you can use NgRx's built-in action creator function!

_app/store/createAction.ts_

```typescript
import { createAction, props } from '@ngrx/store';
import { User } from '../types';

export const addUser = createAction(
  '[Admin Page] Add User',
  props<User>()
);
```

The createAction function takes two arguments, the first is a string that represents the type of the action, and the second are the props that represent the metadata you want to send along with the action!

The resulting utilization of the `[Admin Page] Add User` action becomes much more succinct and clean:

```typescript
  store.dispatch(addUser({ username: 'AngularExpert', firstName: 'Adam', lastName: 'Sandler' }));
```

