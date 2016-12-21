import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

const randomFactory = () => { return Math.random(); };

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  /** Provide dependencies here */
  providers: [
    { provide: 'Random', useFactory: randomFactory },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
