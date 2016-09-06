import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MainComponent } from './main.component.ts';
import { MovieComponent } from './movie.component';


@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    MainComponent,
    MovieComponent
  ],
  bootstrap: [ MainComponent ]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
