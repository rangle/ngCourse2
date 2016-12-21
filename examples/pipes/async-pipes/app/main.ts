import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { bootstrap, platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);