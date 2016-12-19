import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { bootstrap, platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component.ts';
import { HelloEmulatedComponent } from './hello-emulated.component';
import { HelloNativeComponent } from './hello-native.component';
import { HelloNoneComponent } from './hello-none.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [
    AppComponent,
    HelloEmulatedComponent,
    HelloNativeComponent,
    HelloNoneComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);