<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Bootstrapping an Angular 2 Application](#bootstrapping-an-angular-2-application)
  - [File structure](#file-structure)
  - [Bootstrapping Providers](#bootstrapping-providers)
    - [Using Router Providers](#using-router-providers)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Bootstrapping an Angular 2 Application

Bootstrapping is an essential process in Angular - it is where the application is built, and where Angular comes to life. Bootstrapping Angular 2 applications is certainly different from Angular 1.x, but it still a straightforward procedure. Lets take a look at how this is done.  

## File structure

To get started lets create a barebones Angular 2 application with a single Component. To do this we'll need the following files:

- *app/app.component.ts*
- *app/boot.ts*
- *index.html*

*app.component.ts* is where we define our root Component, *index.html* is the page in which this Component will be rendered in, and *boot.ts* is the glue that combines the Component and page together.  

*index.html*

```js
...
<body>
	<my-app>Loading...</my-app>
</body>
...
```

*app/app.component.ts*

```js
import {Component} from 'angular2/core'

@Component({
	selector: 'my-app',
	template: '<b>Bootstrapping an Angular 2 Application</b>'
})

export class MyApp {}
```
*app/boot.ts*

```js
import {bootstrap} from 'angular2/platform/browser'
import {MyApp} from './app.component'

bootstrap(MyApp);
```
[View Example](http://plnkr.co/edit/VmS9belVWf8pVDh0jIlb)

This is the main entry point of the application, the `MyApp` operates as the root Component of our entire application and will be rendered on any `my-app` HTML element encountered. There is a `my-app` HTML element in the *index.html* file, and we use *app/boot.ts* to import the `MyApp` Component and the `bootstrap` function and kickstart the bootstrapping process, which will read the `MyApp` metadata and then load the application wherever the `my-app` selector/tag-name is found. 

Calling `bootstrap` will return a `Promise` that you can use to determine when the bootstrapping routine has completed. This is useful if you want to incorporate an initial UI loading state into you application. 

Why does Angular 2 bootstrap itself in this way? Well there is actually a very good reason. Since Angular 2 is not a web only based framework, we can write Components that will run in NativeScript, or Cordova, or any other environment that can host Angular 2 applications. The magic is then in our bootstrapping process - we can import which `bootstrap` routine we would like to use, depending on the environment we're operating under. In our example, since we were running our Angular 2 application in the browser, we used the bootstrapping process found in `angular2/platform/browser`. 


It also a good idea to leave the bootstrapping process in its own separate *boot.ts* file, this makes it easier to test (since the Components are isolated from the `bootstrap` call), easier to reuse, and gives better organization and structure to our application. 

## Bootstrapping Providers
Calling `bootstrap` also starts the dependency injection system in Angular 2. We won't go over Angular 2's dependency injection system here, that is for another section, instead lets take a look at an example of how to bootstrap your application with application wide providers. 

```js
import {bootstrap} from 'angular2/platform/browser'
import {MyProvider} from './myprovider'
import {MyApp} from './app.component'

bootstrap(MyApp, [MyProvider]);
```
[View Example](http://plnkr.co/edit/KB8W01LadbtqYTODQt39)

We import our root Component, `MyApp`, `bootstrap`, and a custom Provider, `MyProvider`. When we bootstrap our root Component we can pass in application wide Providers that will be injected to any Component that wants to use them.

### Using Router Providers
In order to setup Angular 2's routing service, we need to inject certain routing providers. Routing is a large topic that needs its own section to go over, but lets take a look at a simple example of how to get started with Angular 2's routes using `bootstrap`.  

```js
import {bootstrap} from 'angular2/platform/browser'
import {ROUTE_PROVIDERS} from 'angular2/router'
import {LocationStrategy, HashStrategyLocation} from 'angular2/router'
import {provide} from 'angular2/core'
import {MyApp} from './app.component'

bootstrap(MyApp, [ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})]);
```
[View Example](http://plnkr.co/edit/xZLEIX601g0TqsEOyB8y)

Here we have imported `ROUTER_PROVIDERS` as an application wide Provider that can be configured in our root Component. Since we have injected `ROUTER_PROVIDERS` as an application wide Provider, we can also employ useful router directives in any Component we want, thus allowing us to interact with the router at any point in our application. 

