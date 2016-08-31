import { BrowserModule }  from '@angular/platform-browser';
import { NgModule } '@angular/core';
import { MyApp } from './app.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, FormsModule],
  declarations: [MyApp],
  bootstrap: [MyApp]
})
export class MyAppModule {

}
