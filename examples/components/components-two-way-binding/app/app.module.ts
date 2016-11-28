import { NgModule } '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CounterComponent } from './counter.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    CounterComponent
  ],
  exports: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
