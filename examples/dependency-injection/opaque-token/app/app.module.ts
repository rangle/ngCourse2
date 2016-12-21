import { NgModule, provide } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { EmailModule, apiConfig as emailApiConfig } from './email/index';
import { LoggerModule, apiConfig as loggerApiConfig } from './logger/index';


@NgModule({
  imports: [
    BrowserModule,
    EmailModule,
    LoggerModule,
  ],
  providers: [
    { provide: emailApiConfig, useValue: { apiKey: 'email-key', context: 'registration' } },
    { provide: loggerApiConfig, useValue: { apiKey: 'logger-key' } },
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ],
})
export class AppModule {

}
