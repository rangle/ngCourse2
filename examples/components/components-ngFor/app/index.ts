import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { App } from './app.component.ts';
import { Counter } from './counter.component.ts';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    App
  ],
  bootstrap: [ App ]
})
export class AppModule {
}
platformBrowserDynamic().bootstrapModule(AppModule);
