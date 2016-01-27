<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Part 9: Routing](#part-9-routing)
  - [Why Routing?](#why-routing)
  - [Routing in Angular 2](#routing-in-angular-2)
  - [RouteConfig](#routeconfig)
    - [Route Definition Object](#route-definition-object)
  - [RouterOutlet](#routeroutlet)
  - [RouterLink](#routerlink)
  - [Using the Router Programmatically](#using-the-router-programmatically)
  - [Creating Child Routes](#creating-child-routes)
  - [Using Routing with LocationStrategy](#using-routing-with-locationstrategy)
  - [Using Auxiliary Routes](#using-auxiliary-routes)
    - [Default Route Outlet](#default-route-outlet)
    - [Test Aux 1](#test-aux-1)
  - [Lazy Loading of Components](#lazy-loading-of-components)
  - [RouteParams](#routeparams)
  - [RouteData](#routedata)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Part 9: Routing #

In this section we will discuss the role of routing in Single Page Applications, and how Angular 2 has an improved router, using the new component router.

## Why Routing? ##

Routing allows us to express some aspects of the app's state in the URL. Unlike with server-side front-end solutions, this is optional - we can build the full app without ever changing the URL. Adding routing however, allows the user to go straight into certain aspects of the app. This is very convinient, as it can keep your application linkable, bookmarkable and allow the users to share links with others.

* Useful to maintain the state of the application
* Modular Applications
* Implementing the application based on the roles (certain roles have access to certain url's)

## Routing in Angular 2 ##

The Angular 2 team reworked routing from the ground up in Angular 2. The new component router allows you to configure routes using annotation on the main app component and map each of the routes to the corresponding components. There are 3 main components used to configure routing: 

* [RouteConfig](https://angular.io/docs/ts/latest/api/router/RouteConfig-decorator.html): Annotation similar to View and Component used to define the routes in the main app
* [RouterOutlet](https://angular.io/docs/ts/latest/api/router/RouterOutlet-directive.html): Its a placeholder ~~component~~ directive similar to ng-view that renders the content of each route
* [RouterLink](https://angular.io/docs/ts/latest/api/router/RouterLink-directive.html): Used to define links to the different routes within the application

Refer to the [official documentation](https://angular.io/docs/ts/latest/guide/router.html) for more information.

Angular 2's component router, also allows for child routes, lazy loading of routing data, and a new concept called Auxiliary Routes, which we will be covering in this section. First, lets take a look at the `@RouteConfig` decorator, and how it is used.

## RouteConfig ##

The `@RouteConfig` decorator is used to define the routing for the component. This is where we can setup the expected paths, the components we want to use, and what we want our application to understand them as. To use `@RouteConfig`, you decorate a class with it, and provide an array containing a [Route Definition Object](#route-definition-object).

Below is the sample RouteConfig defined in the main application component.

```javascript
@RouteConfig([
  { path: "/", redirectTo: "/ComponentOne" },
  { path: "/component-one",    as: "ComponentOne",    component: ComponentOne },
  { path: "/component-two",   as: "ComponentOne",   component: ComponentTwo }
])
export default class Main {

} 
```

### Route Definition Object ###

RouteConfig is a decorator defined in Angular 2 which takes the array of [RouteDefinition](https://angular.io/docs/ts/latest/api/router/RouteDefinition-interface.html) to define routes within the application. Every RouteDefinition can have different attributes. Some of the common attributes for the RouteDefinition are:

* **path**: Url to be shown in the browser when application in on the specific route
* **component**: Component to be rendered when the application is on the specific route
* **redirectTo**: Redirect route if needed, each route can have either component or redirect attribute defined in the route
* **name** or **as**: Unique identifier for the route to be used within the application must be CamelCase  
* **useAsDefault**: It's a boolean variable which If set to true, the corresponding child route will navigate to it by default
* **data**: It is an optional property of any type representing arbitrary route metadata for the given route
* **loader**: It is a function that returns a promise that resolves to a component

## RouterOutlet ##

A `RouterOutlet` is a placeholder that Angular dynamically fills based on the application's route. Below is the example how we use the `RouterOutlet` in  Angular 2 inside the template. In order to make use of the `RouterOutlet` we need to give component access to the Router Components we do it by passing `ROUTER_DIRECTIVES` in the component directives array.

A component can only have one unnamed `router-outlet` per-template. If you need to use multipule `router-outlets`, they must be provided a name, which will be covered in the [Auxiliary Routes](#using-auxiliary-routes) section.

Below is the example of how we use the RouterOutlet in Angular 2

```javascript
// ...
@Component({
	selector: 'simple-routing',
	directives: [ROUTER_DIRECTIVES]
	template: `<div>
	Basic Routing
	<ul>
	  <li><a [routerLink]="['/ComponentOne']">Component One</a></li>
	  <li><a [routerLink]="['/ComponentTwo']">Component Two</a></li>
	</ul>
	<div style="border: 1px solid black">
	  <router-outlet></router-outlet>
	</div>
	
	`
})
@RouteConfig([
  {path: '/componentOne', as: 'ComponentOne', useAsDefault: true, component: ComponentOne},
  {path: '/componentTwo', as: 'ComponentTwo', useAsDefault: false, component: ComponentTwo}
  ])
export class SimpleRouting {
  
}
// ...
```
[View Example](http://plnkr.co/edit/xZLEIX601g0TqsEOyB8y?p=preview)

## RouterLink ##

After declaring routes and adding the outlet we need to tell Angular how to navigate between the routes. We can do it in two different ways if we like. One is using plain old href links in the templates as shown below.

```html
<nav>
    <a href="/componentOne">Component One</a>
    <a href="/componentTwo">Component Two</a>
</nav>
```

While this does work, it is not always recomended - as if you change your `@RouteConfig` definition, you will need to manually update all of your templates to reflect the new URL. There is also an issue where this can result in a full-page reload, which is usually something we do not wan't in our single page applications.

The preferred way is to define them using the RouterLink. The `RouterLink` directive lets you link to specific parts of your app. The values in the array will map to the `name` or `as` that was given to the component in the `@RouteConfig`. Example of defining route using RouterLink is shown below.

```html
<ul>
	  <li><a [routerLink]="['/ComponentOne']">Component One</a></li>
	  <li><a [routerLink]="['/ComponentTwo']">Component Two</a></li>
</ul>
```

If we want to define routes with parameters we need to pass the specific parameter value after each route in the `routerLink` array as shown below.

```html
<ul>
	  <li><a [routerLink]="['/ComponentOne']">Component One</a></li>
	  <li><a [routerLink]="['/ComponentTwo']">Component Two</a></li>
	  <li><a [routerLink]="['/ComponentThree',{message: 'Hello World'}]">Component Three with Param</a></li>
</ul>
```
[View Example](http://plnkr.co/edit/6T8sgG9eRfHmMdofWTGy?p=preview)

We will cover accessing the `RouteParams` in your component later in the [RouteParams](#routeparams) section.

Routes should be prepended with `/`, `./`, or `../`.  How you prefix the routes will impact how and where Angular 2 looks to find the component and routing information.

| Prefix | Looks in 
|--------|---
| `/`    | Root of the application
| `./`   | Current component children routes 
| `../`  | Current component parent routes


[View Example](http://plnkr.co/edit/lAJvRhGHwu0D6H5OGkhc?p=preview)

## Using the Router Programmatically ##

In addition to being able to use the `routerLink` directive to control the navigation of your application, you are also able to access the router from your components using the `Router` service. To do this, you need to inject the router into your component.

```ts
// ...
@Component({
  selector: 'component-one',
  template: `Component One<br/>
  <button (click)="onClick()">Click Me</button>
  `
})
export default class ComponentOne { 
  constructor(private _router:Router) { 
    
  }
  onClick () {
    this._router.navigate(['/ComponentThree',{message: 'Called from _router.Navigate'}]);
  }
}
```

[View Example](http://plnkr.co/edit/9pGP7YRdpLKpoUREWdWs?p=preview)

## Creating Child Routes ##

To declare the child routes in the application we declare the main route in the main app and then define specific child routes in the main child component. 

```javascript
@RouteConfig([
  .....
  { path: '/componentOne/...', component: ComponentOneContainer, as: 'ComponentOneContainer'},
  .....  
])
``` 
In the above example we define the main `/componentOne` route which maps to the `ComponentOneContainer` the `...` dots at the end of the route tells Angular that it has associated child routes with it. Next in the child `ComponentOneContainer` we need to do two things:-

* Define the RouterOutlet view where child routes gets rendered
* Set up child routes

Below is the sample of the Child component

```javascript
@Component({
  directives: [ROUTER_DIRECTIVES]
  selector: 'component-one-container',
  template: `Component One Container
  <br/>
  <div style="border: 1px solid red">
    <router-outlet></router-outlet>
  </div>
  `
})
@RouteConfig([{
    path: '/',
    component: ComponentOne,
    as: 'ComponentOne',
    useAsDefault: true
  }, {
    path: '/component-three-nested/:message',
    component: ComponentThree,
    as: 'ComponentThree'
  }
, {
  path: '/component-one-child-one',
  component: ComponentOneChildOne,
  as 'ComponentOneChildOne'
}, {
  path: '/component-one-child-two',
  component: ComponentOneChildTwo,
  as 'ComponentOneChildTwo'
}, {
  path: '/component-one-child-three/:message',
  component: ComponentThree,
  as 'ComponentThree'
}])
export default class ComponentOneContainer { 
  
}

``` 
[View Example](http://plnkr.co/edit/JwPTPbvskkWBSs6SzzkJ?p=preview)

## Using Routing with LocationStrategy ##

Angular 2 supports `LocationStrategy` which is responsible for representing and reading route state from the browser's URL. Angular provides two strategies: `HashLocationStrategy` (default) and `PathLocationStrategy`.  Applications should use the Router or Location services to interact with application route state.

* `HashLocationStrategy` is a LocationStrategy used to configure the Location service to represent its state in the hash fragment of the browser's URL.

For instance, if you call `location.go('/foo')`, the browser's URL will become `example.com/#/foo`.

The following code shows how to configure HashLocationStrategy

```javascript
import {RouterApp} from './router-app/router-app';
export function main() {
  return bootstrap(RouterApp, [
      ROUTER_PROVIDERS,
      provide(LocationStrategy, { useClass: HashLocationStrategy })
  ])
}
```

* `PathLocationStrategy` is a LocationStrategy used to configure the Location service to represent its state in the path of the browser's URL.

PathLocationStrategy is the default binding for LocationStrategy provided in ROUTER_PROVIDERS. If you're using PathLocationStrategy, you must supply a provider for APP_BASE_HREF to a string representing the URL prefix that should be preserved when generating and recognizing URLs.

For instance, if you provide an APP_BASE_HREF of '/my/app' and call location.go('/foo'), the browser's URL will become example.com/my/app/foo.

The following code shows how to configure PathLocationStrategy:

```javascript
import {RouterApp} from './router-app/router-app';
export function main() {
  return bootstrap(RouterApp, [
      ROUTER_PROVIDERS,
      provide(LocationStrategy, { useClass: PathLocationStrategy })
      provide(APP_BASE_HREF, {useValue: '/my/app'})
  ])
}
```

## Using Auxiliary Routes ##

Angular 2 supports the concept of auxiliary routes. Before we go further, we must understand what an auxiliary route is. Auxiliary routes allow you to set up and navigate multiple independent routes in a single app. Each component has one primary route and zero or more auxiliary outlets. Auxiliary outlets must have unique name within a Component. 

To define the auxiliary route we must first add the router outlet where contents for the auxiliary route gets rendered. Sample for the auxiliary route outlet is shown below.

```ts
@Component({
	selector: 'simple-routing',
	directives: [ROUTER_DIRECTIVES]
	template: `<div>
  <!-- ... -->
  <div style="border: 1px solid red;">
  <h3>Default Route Outlet</h3>
    <router-outlet></router-outlet>
  </div>
  <div style="border: 1px solid blue;">
  <h3>Test Aux 1</h3>
    <router-outlet name="testAux1"></router-outlet>
  </div>
  <!-- ... -->
	`
})
@RouteConfig([
  { path: '/',
    component: ComponentOne,
    as: 'ComponentOne',
    useAsDefault: true
  },
   {
    aux: 'testAux1',
    component: ComponentOne,
    name: 'TestAux1',
    path: '/aux1'
  },
    {
    aux: 'testAux2',
    component: ComponentTwo,
    name: 'TestAux2',
    path: '/aux2'
  }
])
export class SimpleRouting {
  
}
```

Next, we need to define the link to the auxiliary route for the application to navigate and render the contents.
```javascript
<a [routerLink]="['./ComponentOne',['TestAux1']]">Test Aux</a>
```
[View Example](http://plnkr.co/edit/USxVl4rBpIPs5Zi3s0pb?p=preview)

Each auxiliary route is an independent route which:

* Can have their own child routes
* Can have their own auxiliary routes
* Have their own route-params
* Can have their own history stack 

## Lazy Loading of Components ##

To lazy load the component and defer the initalization till the component is loaded. For that Angular 2 provides AsyncRoute route. We define the route in route config as shown below.

```javascript
new AsyncRoute({
        path: '/lazy',
        loader: () => ComponentHelper.LoadComponentAsync('LazyLoaded','./components/lazy-loaded/lazy-loaded'),
        name: 'Lazy'
    })
```

## RouteParams ##

`RouteParams` is an immutable map of parameters for the given route based on the url matcher and optional parameters for that route.

You can inject `RouteParams` into the constructor of a component to use it.

_app/app.component.ts_
```javascript
// ....
@Component({
	selector: 'simple-routing',
	directives: [ROUTER_DIRECTIVES]
	template: `<div>
	Basic Routing
	<ul>
	  <li><a [routerLink]="['/ComponentOne']">Component One</a></li>
	  <li><a [routerLink]="['/ComponentTwo',{message:'Route Params In Message'}]">Component Two</a></li>
	</ul>
	<div style="border: 1px solid black">
	  <router-outlet></router-outlet>
	</div>
	
	`
})
@RouteConfig([
  {path: '/componentOne', as: 'ComponentOne', useAsDefault: true, component: ComponentOne},
  {path: '/componentTwo/:message', as: 'ComponentTwo', useAsDefault: false, component: ComponentTwo}
  ])
export class SimpleRouting {
  
}
```

And to access the `RouteParams` in `ComponentTwo`,

_app/component-two.ts_
```ts
import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
@Component({
  selector: 'component-two',
  template: 'Component two: {{ message }}'
})
export default class ComponentTwo { 
  public message:string;
  constructor(private routeParams: RouteParams) {
    this.message = this.routeParams.get('message');
  }
}
```
[View Example](http://plnkr.co/edit/Sf54bMaDtfVGOwUAcmzv?p=preview)

## RouteData ##

While most of the time parent components will be passing data to their children, Angular also offers a mechanism to pass additional data to components at the time of the route configuration. For example, besides the data that a component needs for implementing application logic, we may need to pass a flag indicating if the application runs in production environment or not. This can be done by using the data property of the `@RouteConfig` decorator. For example, let's modify the routing for the previous example to add `data` to `ComponentTwo`

_app/component-two.ts_

```javascript
@RouteConfig([
  { path: '/componentOne', 
    as: 'ComponentOne', 
    useAsDefault: true, 
    component: ComponentOne},
  { path: '/componentTwo/:message',
    as: 'ComponentTwo', 
    component: ComponentTwo, 
    data: { passedData: 'Passed in via Data'}}
  ])
export class SimpleRouting {
  
}
```

Accordingly, the constructor of the `ComponentTwo` will need an extra argument of type RouteData:

```javascript
import {Component} from 'angular2/core';
import {RouteParams, RouteData} from 'angular2/router';
@Component({
  selector: 'component-two',
  template: `Component two:
  <p>Message: {{message}}</p>
  <p>Data: {{data}}</p>`
  
})
export default class ComponentTwo { 
  public message:string;
  public data:string;
  
  constructor(private routeParams: RouteParams, private routeData: RouteData) {
    this.message = this.routeParams.get('message');
    this.data = this.routeData.get('passedData')
  }
}
```
[View Example](http://plnkr.co/edit/wIG7xD17OHSaxe7wNkAY?p=preview)

Passing data to a route with `RouteData` is not an alternative to `RouteParams`. While `RouteParams` is used to pass the data from one route to another based on the user’s selections (e.g. show details of the selected product), `RouteData` can come handy when you need to pass some data to a route during the configuration phase, e.g. is it a production or QA environment, should the user have administrator’s privileges, or what URL to use for the product service.
