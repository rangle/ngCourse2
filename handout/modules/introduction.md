# What is an Angular 2 Module?

In Angular 2, a module is a mechanism to group components, directives, pipes and services that are related, in such a way that can be combined with other modules to create an application. An Angular 2 application can be thought of as a puzzle where each piece (or each module) is needed to be able to see the full picture.

Another analogy to understand Angular 2 modules is classes. In a class, we can define public or private methods. The public methods are the API that other parts of our code can use to interact with it while the private methods are implementation details that are hidden. In the same way, a module can export or hide components, directives, pipes and services. The exported elements are meant to be used by other modules, while the ones that are not exported (hidden) are just used inside the module itself and cannot be directly accessed by other modules of our application.

## A Basic Use of Modules

To be able to define modules we have to use the decorator `NgModule`.

```js
import { NgModule } from '@angular/core';

@NgModule({
  imports: [ ... ],
  declarations: [ ... ],
  bootstrap: [ ... ]
})
export class AppModule { }
```

In the example above, we have turned the class `AppModule` into an Angular 2 module just by using the `NgModule` decorator. The `NgModule` decorator requires at least three properties: `imports`, `declarations` and `bootstrap`.

The property `imports` expects an array of modules. Here's where we define the pieces of our puzzle (our application). The property `declarations` expects an array of components, directives and pipes that are part of the module. The `bootstrap` property is where we define the root component of our module. Even though this property is also an array, 99% of the time we are going to define only one component.

> There are very special circumstances where more than one component may be required to bootstrap a module but we are not going to cover those edge cases here.

Here's how a basic module made up of just one component would look like:

_app/app.component.ts_

```js
import { Component } from '@angular/core';

@Component({
  selector: 'rio-app',
  template: '<h1>My Angular 2 App</h1>'
})
export class AppComponent {}
```

_app/app.module.ts_

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

The file _app.component.ts_ is just a "hello world" component, nothing interesting there. In the other hand, the file _app.module.ts_ is following the structure that we've seen before for defining a module but in this case, we are defining the modules and components that we are going to be using.

The first thing that we notice is that our module is importing the `BrowserModule` as an explicit dependency. The `BrowserModule` is a built-in module that exports basic directives, pipes and services. Unlike previous versions of Angular 2, we have to explicitly import those dependencies to be able to use directives like `*ngFor` or `*ngIf` in our templates.

Given that the root (and only) component of our module is the `AppComponent` we have to list it in the `bootstrap` array. Because in the `declarations` property we are supposed to define **all** the components or pipes that make up our application, we have to define the `AppComponent` again there too. 

Before moving on, there's an important clarification to make. **There are two types of modules, root modules and feature modules**.

In the same way that in a module we have one root component and many possible secondary components, **in an application we only have one root module and zero or many feature modules**. To be able to bootstrap our application, Angular needs to know which one is the root module. An easy way to identify a root module is by looking at the `imports` property of its `NgModule` decorator. If the module is importing the `BrowserModule` then it's a root module, if instead is importing the `CommonModule` then it is a feature module.

> As developers, we need to take care of importing the `BrowserModule` in the root module and instead, import the `CommonModule` in any other module we create for the same application. Failing to do so might result in problems when working with lazy loaded modules as we are going to see in following sections.

By convention, the root module should always be named `AppModule`.

## Bootstrapping an Application

To bootstrap our module based application, we need to inform Angular which one is our root module to perform the compilation in the browser. This compilation in the browser is also known as "Just in Time" (JIT) compilation.

_main.ts_

```js
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
```

> It is also possible to perform the compilation as a build step of our workflow. This method is called "Ahead of Time" (AOT) compilation and will require a slightly different bootstrap process that we are going to discuss in another section.

[View Example](https://plnkr.co/edit/y5wuXshv7uqjbJHr3x5I?p=preview)

In the next section we are going to see how to create a module with multiple components, services and pipes.