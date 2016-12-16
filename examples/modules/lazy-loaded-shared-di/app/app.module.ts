import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { EagerComponent } from './eager.component';
import { routing } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule.forRoot(),
    routing
  ],
  declarations: [
    AppComponent,
    EagerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
