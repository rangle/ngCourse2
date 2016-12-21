import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { bootstrap, platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { AnimateNumberPipe } from './animate-number.pipe';

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    AnimateNumberPipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);