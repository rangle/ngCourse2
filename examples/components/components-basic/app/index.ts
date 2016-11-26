import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HelloComponent } from './app.component.ts';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    HelloComponent
  ],
  bootstrap: [ HelloComponent ]
})
export class AppModule {
}
platformBrowserDynamic().bootstrapModule(AppModule);
