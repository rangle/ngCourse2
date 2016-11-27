import { NgModule } '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [ AppComponent ],
  exports: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
