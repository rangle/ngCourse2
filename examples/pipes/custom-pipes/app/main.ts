import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { bootstrap, platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { FormatFileSizePipe } from './format-file-size.pipe';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,
    FormatFileSizePipe
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);