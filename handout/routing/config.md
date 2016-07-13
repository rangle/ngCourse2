# Configuring Routes #

## Base URL tag ##

Base URL tag must be set within the `<head>` tag of index.html:

```html
<base href="/">
```

> In the demos we use a script tag to set the base tag. In a real application it must be set as above.

## RouteConfig array ##

The `RouteConfig` type is an array of routes that is used to define the routing for the application. This is where we can set up the expected paths, the components we want to use and what we want our application to understand them as. To use `RouteConfig`, you create a RouteConfig array which contains [Route Definition Object](#route-definition-object)s.

Below is the sample RouteConfig array definition:

```javascript
const routes: RouterConfig = [
  { path: 'component-one', component: ComponentOne },
  { path: 'component-two', component: ComponentTwo }
];
```

[See RouteConfig definition](https://angular.io/docs/ts/latest/api/router/index/RouterConfig-type-alias.html)

## Route Definition Object ##

RouteConfig is an array type defined in Angular 2 which takes the array of routes definitions to define the routes within the application. Each route could have different attributes; some of the common attributes are:

* _path_ - URL to be shown in the browser when application is on the specific route
* _component_ - Component to be rendered when the application is on the specific route
* _redirectTo_ - Redirect route if needed; each route can have either component or redirect attribute defined in the route (covered later in this chapter)
* _pathMatch_ - Optional property that defaults to 'prefix'; determines whether to match full URLs or just the beginning. Set to 'full' when defining the redirect route.
* _children_ - Array of route definitions objects representing the child routes of this route (covered later in this chapter)

## provideRouter ##

`provideRouter` is a function which takes the `RouteConfig` array as an argument and returns the providers necessary for routing.

The providers returned by `provideRouter` *must* be provided when bootstrapping the application to register the routes. In the bootstrap file:

```javascript
import { provideRouter, RouterConfig } from '@angular/router';

const routes: RouterConfig = [
  { path: 'component-one', component: ComponentOne },
  { path: 'component-two', component: ComponentTwo }
];

bootstrap(AppComponent, [
  provideRouter(routes)
]);
```

