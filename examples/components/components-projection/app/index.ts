import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { App } from './app.component.ts';
import { ChildSelect } from './child-select.component.ts';
import { Child } from './child.component.ts';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    App,
    Child,
    ChildSelect
  ],
  bootstrap: [ App ]
})
export class AppModule {
}
platformBrowserDynamic().bootstrapModule(AppModule);
