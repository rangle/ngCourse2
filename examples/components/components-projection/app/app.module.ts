import { NgModule } '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChildComponent } from './child.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    ChildComponent
  ],
  exports: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
