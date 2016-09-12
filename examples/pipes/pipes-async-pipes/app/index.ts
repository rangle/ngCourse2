import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { bootstrap, platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ProductPrice } from './product-price.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    ProductPrice
  ],
  bootstrap: [ ProductPrice ]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
