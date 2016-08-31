import { BrowserModule }  from '@angular/platform-browser';
import { NgModule } '@angular/core';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [BrowserModule, HttpModule],
  declarations: [MyApp],
  bootstrap: [MyApp]
})
export class MyAppModule {

}
