# Bootstrapping Providers

The bootstrap process also starts the dependency injection system in Angular 2.
We won't go over Angular 2's dependency injection system here - that is covered later.
Instead let's take a look at an example of how to bootstrap your application with application-wide providers.

For this, we will register a service called `GreeterService` with the `providers` property of the module we are using to bootstrap the application.

_*app/app.module.ts*_
```typescript
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
```
[View Example](https://plnkr.co/edit/bcpliM?p=preview)
