# Ngrx Side Effects

Often times, we need to perform some logic after an action has been dispatched and the store has been updated. Because reducers should be side-effect free, we need a way to deal with handling these side-effects. Sometimes we can put with our action services, and that works for simple cases, but often times the same block of logic needs to run

Ngrx offers a library called ngrx-effects, which solves all of these problems.

## Creating your first effects service

```typescript
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth/';


@Injectable()
export class CustomizationEffects {

  constructor(private actions$: Actions) {
    
  }

  @Effect()
  login$ = this.actions$
    .ofType(SessionActions.LOGIN_USER_PENDING)
    .mergeMap<Action>(action => this.apiService.getCustomizations()
      .map(result => createAction(CustomizationActions.CUSTOMIZATIONS_RETRIEVE_SUCCESS, result.json()))
      .catch(error => Observable.of(createAction(CustomizationActions.CUSTOMIZATIONS_RETRIEVE_ERROR, error.json())))
    );
```

## Configuring your effects service

```typescript
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/Session';

@NgModule({
  imports: [
    EffectsModule.run(AuthEffects)
  ]
})
export class AppModule { }
```