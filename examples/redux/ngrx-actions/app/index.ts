import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { StoreModule } from '@ngrx/store';

import { SimpleNgrx } from './containers/app-container';
import { Counter } from './components/counter-component';
import { counterReducer } from './reducers/counter-reducer';

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.provideStore({ counter: counterReducer })
  ],
  declarations: [
    SimpleNgrx,
    Counter
  ],
  bootstrap: [ SimpleNgrx ]
})
class AppModule {
}
platformBrowserDynamic().bootstrapModule(AppModule);
