# Creating a Feature Module

When our root module start growing, it starts to be evident that some elements (components, directives, etc.) are related in a way that almost feel like they belong to a library that can be "plugged in".

In our previous example, we started to see that. Our root module has a component, a pipe and a service that its only purpose is to deal with credit cards. What if we extract these three elements to their own **feature module** and then we import it into our **root module**?

We are going to do just that. The first step is to create two folders to differentiate the elements that belong to the root module from the elements that belong to the feature module.

```
.
├── app
│   ├── app.component.ts
│   └── app.module.ts
├── credit-card
│   ├── credit-card-mask.pipe.ts
│   ├── credit-card.component.ts
│   ├── credit-card.module.ts
│   └── credit-card.service.ts
├── index.html
└── main.ts
```

Notice how each folder has its own module file: _app.module.ts_ and _credit-card.module.ts_. Let's focus on the latter first.

_credit-card/credit-card.module.ts_

```js
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditCardMaskPipe } from './credit-card-mask.pipe';
import { CreditCardService } from './credit-card.service';
import { CreditCardComponent } from './credit-card.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CreditCardMaskPipe,
    CreditCardComponent
  ],
  providers: [CreditCardService],
  exports: [CreditCardComponent]
})
export class CreditCardModule {}
```

Our feature `CreditCardModule` it's pretty similar to the root `AppModule` with a few important differences:

- We are not importing the `BrowserModule` but the `CommonModule`. If we see the documentation of the `BrowserModule` [here](https://angular.io/docs/ts/latest/api/platform-browser/index/BrowserModule-class.html), we can see that it's re-exporting the `CommonModule` with a lot of other services that helps with rendering an Angular 2 application in the browser. These services are coupling our root module with a particular platform (the browser), but we want our feature modules to be platform independent. That's why we only import the `CommonModule` there, which only exports common directives and pipes.

> When it comes to components, pipes and directives, every module should import its own dependencies disregarding if the same dependencies were imported in the root module or in any other feature module. In short, even when having multiple feature modules, each one of them needs to import the `CommonModule`.

- We are using a new property called `exports`. Every element defined in the `declarations` array is **private by default**. We should only export whatever the other modules in our application need to perform its job. In our case, we only need to make the `CreditCardComponent` visible because it's being used in the template of the `AppComponent`.

_app/app.component.ts_

```js
...
@Component({
  ...
  template: `
    ...
    <rio-credit-card></rio-credit-card>
  `
})
export class AppComponent {}
```
 
> We are keeping the `CreditCardMaskPipe` private because it's only being used inside the `CreditCardModule` and no other module should use it directly.

We can now import this feature module into our simplified root module.

_app/app.module.ts_

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CreditCardModule } from '../credit-card/credit-card.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    CreditCardModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

At this point we are done and our application behaves as expected.

[View Example](https://plnkr.co/edit/3PmR8SOEHPZoeBgK6exT?p=preview)

## Services and Lazy Loaded Modules

Here's the tricky part of Angular modules. While components, pipes and directives are scoped to its modules unless explicitly exported, services are globally available unless the module is lazy loaded.

It's hard to understand that at first so let's try to see what's happening with the `CreditCardService` in our example. Notice first that the service is not in the `exports` array but in the `providers` array. With this configuration, our service is going to be available everywhere, even in the `AppComponent` which lives in another module. So, even when using modules, there's no way to have a "private" service unless... the module is being lazy loaded.

When a module is lazy loaded, Angular is going to create a child injector (which is a child of the root injector from the root module) and will create an instance of our service there.

Imagine for a moment that our `CreditCardModule` is configured to be lazy loaded. With our current configuration, when the application is bootstrapped and our root module is loaded in memory, an instance of the `CreditCardService` (a singleton) is going to be added to the root injector. But, when the `CreditCardModule` is lazy loaded sometime in the future, a child injector will be created for that module **with a new instance** of the `CreditCardService`. At this point we have a hierarchical injector with **two instances** of the same service, which is not usually what we want. 

Think for example of a service that does the authentication. We want to have only one singleton in the entire application, disregarding if our modules are being loaded at bootstrap or lazy loaded. So, in order to have our feature module's service **only** added to the root injector, we need to use a different approach.

_credit-card/credit-card.module.ts_

```js
import { NgModule, ModuleWithProviders } from '@angular/core';
/* ...other imports... */

@NgModule({
  imports: [CommonModule],
  declarations: [
    CreditCardMaskPipe,
    CreditCardComponent
  ],
  exports: [CreditCardComponent]
})
export class CreditCardModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CreditCardModule,
      providers: [CreditCardService]
    }
  }
}
```

Different than before, we are not putting our service directly in the property `providers` of the `NgModule` decorator. This time we are defining a static method called `forRoot` where we define the module **and** the service we want to export.

With this new syntax, our root module is slightly different.

_app/app.module.ts_

```js
/* ...imports... */

@NgModule({
  imports: [
    BrowserModule,
    CreditCardModule.forRoot()
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Can you spot the difference? We are not importing the `CreditCardModule` directly, instead what we are importing is the object returned from the `forRoot` method, which includes the `CreditCardService`. Although this syntax is a little more convoluted than the original, it will guarantee us that only one instance of the `CreditCardService` is added to the root module. When the `CreditCardModule` is loaded (even lazy loaded), no new instance of that service is going to be added to the child injector.

[View Example](https://plnkr.co/edit/c2VWbjNfetvl3KIPOz3x?p=preview)

As a rule of thumb, **always use the `forRoot` syntax when exporting services from feature modules**, unless you have a very special need that requires multiple instances at different levels of the dependency injection tree.