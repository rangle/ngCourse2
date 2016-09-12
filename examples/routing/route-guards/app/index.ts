import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { bootstrap, platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import AppComponent from './app.component.ts';
import ComponentOne from './component-one';
import ComponentTwo from './component-two';
import { routing, appRoutingProviders } from './app.routes';
import ActivateGuard from './activate-guard';
import DeactivateGuard from './deactivate-guard';


@NgModule({
  imports: [
    BrowserModule,
    routing
  ],
  declarations: [
    AppComponent,
    ComponentOne,
    ComponentTwo
  ],
  providers: [
    appRoutingProviders,
    ActivateGuard,
    DeactivateGuard
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
