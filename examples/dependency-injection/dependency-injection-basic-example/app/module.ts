import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './containers/app';
import { Hamburger, Bun, Patty, Toppings } from './services/index';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    App
  ],
  /** Provide dependencies here */
  providers: [
    Bun,
    Hamburger,
    Patty,
    Toppings,
  ],
  bootstrap: [ App ],
})
export class AppModule {}
