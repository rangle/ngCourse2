import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ChildInheritorComponent, ChildOwnInjectorComponent } from './components/index';
import { Unique } from './services/unique';


const randomFactory = () => { return Math.random(); };

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    ChildInheritorComponent,
    ChildOwnInjectorComponent,
  ],
  /** Provide dependencies here */
  providers: [Unique],
  bootstrap: [AppComponent],
})
export class AppModule {}
