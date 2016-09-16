import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgReduxModule, NgRedux } from 'ng2-redux';
import logger from './store/configure-logger';
import rootReducer from './reducers/index';

import { SimpleRedux } from './containers/app-container';
import { Counter } from './components/counter-component';

@NgModule({
  imports: [
    BrowserModule,
    NgReduxModule
  ],
  declarations: [
    SimpleRedux,
    Counter
  ],
  bootstrap: [ SimpleRedux ]
})
class AppModule {
  constructor(ngRedux: NgRedux<any>) {
    ngRedux.configureStore(rootReducer, {}, [ logger ]);
  }
}
platformBrowserDynamic().bootstrapModule(AppModule);
