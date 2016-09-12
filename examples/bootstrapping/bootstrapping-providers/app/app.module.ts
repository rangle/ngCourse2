import { BrowserModule }  from '@angular/platform-browser';
import { NgModule } '@angular/core';
import { MyApp } from './app.component'
import { Greeter } from './greeter.service';

@NgModule({
  imports: [BrowserModule],
  providers: [Greeter],
  declarations: [MyApp],
  bootstrap: [MyApp]
})
export class MyAppModule {

}
