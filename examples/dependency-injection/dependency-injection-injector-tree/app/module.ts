import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './app.component';
import { ChildInheritor, ChildOwnInjector } from './components/index';
import { Unique } from './services/unique';


const randomFactory = () => { return Math.random(); };

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    App,
    ChildInheritor,
    ChildOwnInjector,
  ],
  /** Provide dependencies here */
  providers: [
    Unique,
  ],
  bootstrap: [ App ],
})
export class AppModule {}
