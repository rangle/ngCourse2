import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './app.component';

const randomFactory = () => { return Math.random(); };

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    App
  ],
  /** Provide dependencies here */
  providers: [
    { provide: 'Random', useValue: Math.random() },
  ],
  bootstrap: [ App ],
})
export class AppModule {}
