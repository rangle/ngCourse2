# Configuring your application to use ngrx #

Once you have the reducers created, it’s time to configure your
Angular application. In your main application module, simple add the 
`StoreModule.provideStore()` call to your NgModule's imports:

_app/app.module.ts_
```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import 'rxjs/Rx';

import {rootReducer} from './state/rootReducer';
import {CounterActions} from './state/actions';
import {CounterEffects} from './state/effects';
import {AppComponent, CounterComponent} from './components';
import {CounterService} from './services';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(rootReducer)
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