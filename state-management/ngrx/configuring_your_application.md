# Configuring your Application

Once you have your reducers created, it’s time to configure your Angular application. In your main application module, simple add the `StoreModule.forRoot()` call to your `@NgModule`'s imports:

_app/app.module.ts_

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/http';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {rootReducer} from './store/rootReducer';
import {CounterActions} from './store/actions';
import {CounterEffects} from './store/effects';
import {AppComponent, CounterComponent} from './components';
import {CounterService} from './services';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(rootReducer)
  ],
  declarations: [
    AppComponent,
    CounterComponent
  ],
  providers: [
    CounterActions,
    CounterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
```

