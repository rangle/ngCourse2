import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './containers/app';
import { ChatWidget, AuthService, AuthWidget, ChatSocket } from './components/index';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    App
  ],
  /** Provide dependencies here */
  providers: [
    ChatWidget, 
    AuthService, 
    AuthWidget, 
    ChatSocket,
  ],
  bootstrap: [ App ],
})
export class AppModule {}
