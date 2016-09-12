import { BrowserModule }  from '@angular/platform-browser';
import { NgModule } '@angular/core';
import { LoginForm } from './login-form.component'

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, 
    ReactiveFormsModule, 
    FormsModule],
  declarations: [LoginForm],
  bootstrap: [LoginForm]
})
export class MyAppModule {

}
