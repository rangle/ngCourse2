import { BrowserModule }  from '@angular/platform-browser';
import { NgModule } '@angular/core';
import { SearchService } from './services/search.service';
import { AppComponent } from './app.component'
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, 
    ReactiveFormsModule, 
    FormsModule, 
    HttpModule],
  providers: [SearchService],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
