import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component.ts';
import { HelloComponent } from './hello.component.ts';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,
    HelloComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
platformBrowserDynamic().bootstrapModule(AppModule);
