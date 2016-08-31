import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { bootstrap, platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Hello } from './hello.component';
import { DelayPipe } from './delay.pipe';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    Hello,
    DelayPipe
  ],
  bootstrap: [ Hello ]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
