# Side Effects

Often times, we need to perform some logic after an action has been dispatched and the store has been updated. Because reducers should be side-effect free, we need a way to handle these side-effects. Sometimes we can put this logic with our action creator services, and that works for simple cases, but often times the same block of logic needs to run in response to multiple action types.

[@ngrx](https://github.com/ngrx) offers a library called [@ngrx/effects](https://github.com/ngrx/effects) to solve these problems.

## Creating your first effects service

Let's say we have an application that supports customizable themes and other customization options. To support this functionality, we'll need to fetch these customizations from the server whenever a user logs into the application.

Let's build out a `CustomizationEffects` service to accomplish this:

```typescript
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';

import {createAction} from '../createAction';
import {CustomizationActions, SessionActions} from '../session/session.actions.ts';
import {ApiService} from '../../services';

@Injectable()
export class CustomizationEffects {

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {

  }

  @Effect()
  login$ = this.actions$
    .ofType(SessionActions.LOGIN_SEND_SUCCESS)
    .pipe(
      mergeMap<Action>(action => this.apiService.getCustomizations(action.payload.userId)),
      map(result => createAction(CustomizationActions.CUSTOMIZATIONS_RETRIEVE_SUCCESS, result.json())),
      catchError(error => Observable.of(createAction(CustomizationActions.CUSTOMIZATIONS_RETRIEVE_ERROR, error.json())))
    );

}
```

[@ngrx/effects](https://github.com/ngrx/effects) provides an Angular `actions$` service \(which is also an `Observable`\) to emit every action that has been dispatched by your application in a single stream. Its `ofType()` method can be used to filter the one or more actions we're interesting in before adding a side-effect.

In this example, when the `LOGIN_SEND_SUCCESS` action occurs from anywhere in the application, we make a request to the server to fetch the user's customizations given their `userId`, which has been attached to the payload of this action. Regardless if this requests succeeds or fails, we need to create and return an `Observable` that is bound to the new action we'd like Redux to perform, such as storing the customizations when the request is successful, or processing the error returned by the server if there's an error.

To tell [@ngrx/effects](https://github.com/ngrx/effects) which `Observable` objects are side-effects to associate them with Redux, we need to provide a hint using the `@Effect()` decorator. Without it, your side-effect will not run.

## Configuring your effects service

Lastly, we just need to add the `CustomizationEffects` service as a module to the `@NgModule`'s imports to start the effects:

```typescript
// ...
import {EffectsModule} from '@ngrx/effects';

import {CustomizationEffects} from './store/customization/customization.effects';

@NgModule({
  imports: [
    // ...
    EffectsModule.run(CustomizationEffects)
  ],
  // ...
})
export class AppModule { }
```

