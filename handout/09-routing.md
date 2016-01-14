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

For more information on Angular.io routing, refer to their [Routing & Navigation Guide](https://angular.io/docs/ts/latest/guide/router.html)

Angular 2's component router, also allows for child routes, lazy loading of routing data, and a new concept called Auxiliary Routes, which we will be covering in this section. First, lets take a look at the `@RouteConfig` decorator, and how it is used.

## RouteConfig ##

The `@RouteConfig` decorator is used to define the routing for the component. This is where we can setup the expected paths, the components we want to use, and what we want our application to understand them as. To use `@RouteConfig`, you decorate a class with it, and provide an array containing a [Route Route Definition Object](#route-definition-object).

Below is the sample RouteConfig defined in the main application component.

```javascript
@RouteConfig([
  { path: "/", redirectTo: "/todo" },
  { path: "/todo",    as: "Todo",    component: TodoComponent },
  { path: "/help",   as: "Help",   component: HelpComponent }
])
export default class Main {

} 
```

### Route Definition Object ###

RouteConfig is a decorator defined in Angular2 which takes the array of [RouteDefinition](https://angular.io/docs/ts/latest/api/router/RouteDefinition-interface.html) to define routes within the application. Every RouteDefinition can have different attributes. Some of the common attributes for the RouteDefinition are:

* **path**: Url to be shown in the browser when application in on the specific route
* **component**: Component to be rendered when the application is on the specific route
* **redirectTo**: Redirect route if needed, each route can have either component or redirect attribute defined in the route
* **name** or **as**: Unique identifier for the route to be used within the application must be CamelCase  
* **useAsDefault**: It's a boolean variable which If set to true, the corresponding child route will navigate to it by default
* **data**: It is an optional property of any type representing arbitrary route metadata for the given route
* **loader**: It is a function that returns a promise that resolves to a component

## RouterOutlet ##

A `RouterOutlet` is a placeholder that Angular dynamically fills based on the application's route. Below is the example how we use the `RouterOutlet` in  Angular 2 inside the template. In order to make use of the `RouterOutlet` we need to give component access to the Router Components we do it by passing `ROUTER_DIRECTIVES` in the component directives array.

A component can only have one unnamed `router-outlet` per-template. If you need to use multipul `router-outlets`, they must be provided a name, which will be covered in the [Auxiliary routes](#using- -auxiliary-routes) section.

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

After declaring routes and adding the outlet we need to tell angular how to navigate between the routes. We can do it in differnet ways we like. One is using plain old href links in the templates as shown below.

```html
<nav>
    <a href="/todo">Todo</a>
    <a href="/help">Help</a>
</nav>
```

While this does work, it is not always recomended - as if you change your `@RouteConfig` definition, you will need to manually update all of your templates to reflect the new URL. 

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

The first route name should be prepended with `/`, `./`, or `../`. If the route begins with `/`, the router will look up the route from the root of the app. If the route begins with `./`, the router will instead look in the current component's children for the route. And if the route begins with `../`, the router will look at the current component's parent.

## Creating Child Routes ##

To declare the child routes in the application we declare the main route in the main app and then define specific child routes in the main child component. 

```javascript
@RouteConfig([
  .....
  { path: '/start/...', component: Start, as: 'Start'},
  .....  
])
``` 
In the above example we define the main `/start` route which maps to the Start component, the `...` dots at the end of the route tells Angular that it has associated child routes with it. Next in the child Start Component we need to do two things:-

* Define the RouterOutlet view where child routes gets rendered
* Set up child routes in the component itself

Below is the sample of the Child component

```javascript
@Component({
  selector: 'start'
})
@RouteConfig([
  {path: '/', component: StartMain, as: 'StartMain'  },
  {path: '/child', component: StartChild, as: 'StartChild'  }
])
@View({
  directives: [ROUTER_DIRECTIVES],
  template: `
  <div>
    Start Component
    <li><a [routerLink]="['./StartMain']">StartMain</a></li>
    <li><a [routerLink]="['./StartChild']">StartChild</a></li>
    <router-outlet></router-outlet>
  </div>
  `
})
export class Start {}
``` 

## Using routing with LocationStrategy ##

Angular 2 supports LocationStrategy which is responsible for representing and reading route state from the browser's URL. Angular provides two strategies: HashLocationStrategy (default) and PathLocationStrategy. They both use location service under the hood. Applications should use the Router or Location services to interact with application route state.

* HashLocationStrategy is a LocationStrategy used to configure the Location service to represent its state in the hash fragment of the browser's URL.
For instance, if you call location.go('/foo'), the browser's URL will become example.com/#/foo.

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

* **PathLocationStrategy** is a LocationStrategy used to configure the Location service to represent its state in the path of the browser's URL.
PathLocationStrategy is the default binding for LocationStrategy provided in ROUTER_PROVIDERS. If you're using PathLocationStrategy, you must provide a provider for APP_BASE_HREF to a string representing the URL prefix that should be preserved when generating and recognizing URLs.
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


## Using Auxiliary routes ##

Angular 2 supports the concept of auxiliary routes. Before we go further, we must understand what an auxiliary route is. Auxiliary routes allow you to set up and navigate multiple independent routes in a single app. Each component has one primary route and zero or more auxiliary outlets. Auxiliary outlets must have unique name within a Component. 

To define the auxiliary route we must first add the router outlet where contents for the auxiliary route gets rendered. Sample for the auxiliary route outlet is shown below.
```html
@View({
  directives: [RouterLink, ROUTER_DIRECTIVES],
  template: `
  <div>
    <router-outlet></router-outlet>
    <router-outlet name="testAux"></router-outlet>
  </div>
  `
})
```

Next, we need to define the link to the auxiliary route for the application to navigate and render the contents.
```javascript
<a [routerLink]="['./',['testAux']]">Test Aux</a>
```

Each Auxiliary route is an independent route which:-

* Can have their own child routes
* Can have their own auxiliary routes
* Have their own route-params
* Can have their own history stack 

***Routing with lazy-loading of components***

To lazy load the component and defer the initalization till the component is loaded. For that angular 2 provides AsyncRoute route. We define the route in route config as shown below.

```javascript
new AsyncRoute({
        path: '/lazy',
        loader: () => ComponentHelper.LoadComponentAsync('LazyLoaded','./components/lazy-loaded/lazy-loaded'),
        name: 'Lazy'
    })
```

## RouteParams ##

RouteParams is an immutable map of parameters for the given route based on the url matcher and optional parameters for that route.

You can inject RouteParams into the constructor of a component to use it.

```javascript
@Component({directives: [ROUTER_DIRECTIVES]})
@RouteConfig([
 {path: '/user/:id', component: UserCmp, as: 'UserCmp'},
])
class AppCmp {}
@Component({ template: 'user: {{id}}' })
class UserCmp {
  id: string;
  constructor(params: RouteParams) {
    this.id = params.get('id');
  }
}
```

## RouteData ##

While most of the time parent components will be passing data to their children, Angular also offers a mechanism to pass additional data to components at the time of the route configuration. For example, besides the data that a component needs for implementing application logic, we may need to pass a flag indicating if the application runs in production environment or not. This can be done by using the data property of the @RouteConfig annotation. For example, our ProductDetail route can be configured as follows:

```javascript
@RouteConfig([
    {path: '/product/:id', component: ProductDetailComponentParam,
     as: 'ProductDetail', data: {isProd: true}}])
```

Accordingly, the constructor of the ProductDetailComponent will need an extra argument of type RouteData:

```javascript
export class ProductDetailComponentParam {
    productID: string;
    constructor(params: RouteParams, data: RouteData) {
        this.productID = params.get('id');
 
        console.log(`Is this prod environment: ${data.get('isProd')}`);
    }
}
```

Passing data to a route with RouteData is not an alternative to RouteParams. While RouteParams is used to pass the data from one route to another using based on the user’s selections (e.g. show details of the selected product), RouteData can come handy when you need to pass some data to a route during the configuration phase, e.g. is it a production or QA environment, should the user have administrator’s privileges, or what URL of use for the product service.