import { BrowserModule }  from '@angular/platform-browser';  
import { NgModule } '@angular/core';
import { AppComponent } from './app.component'
import { GreeterService } from './greeter.service';

@NgModule({
  imports: [BrowserModule],
  providers: [GreeterService],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
