import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { StoreModule, combineReducers } from '@ngrx/store';

import { SimpleNgrx } from './containers/app-container';
import { Counter } from './components/counter-component';
import rootReducer from './reducers/index';

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.provideStore(rootReducer)
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
