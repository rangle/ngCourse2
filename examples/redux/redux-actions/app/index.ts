import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgReduxModule } from 'ng2-redux';

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
}
platformBrowserDynamic().bootstrapModule(AppModule);
