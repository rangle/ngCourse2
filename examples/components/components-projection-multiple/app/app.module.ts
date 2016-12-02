import { NgModule } '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChildSelectComponent } from './child-select.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    ChildSelectComponent
  ],
  exports: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
