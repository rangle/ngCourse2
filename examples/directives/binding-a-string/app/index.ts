import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { bootstrap, platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component.ts';
import {ClassAsStringComponent} from './class-as-string.component';
import {ClassAsArrayComponent} from './class-as-array.component';
import {ClassAsObjectComponent} from './class-as-object.component';


@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,
    ClassAsStringComponent,
    ClassAsArrayComponent,
    ClassAsObjectComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);