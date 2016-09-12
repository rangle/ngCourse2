import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { bootstrap, platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { App } from './app.component.ts';
import { HelloEmulated } from './hello-emulated.component';
import { HelloNative } from './hello-native.component';
import { HelloNone } from './hello-none.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [
    App,
    HelloEmulated,
    HelloNative,
    HelloNone
  ],
  bootstrap: [ App ]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
