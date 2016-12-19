import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { bootstrap, platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component.ts';
import { AlertComponent } from './alert.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,
    AlertComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);