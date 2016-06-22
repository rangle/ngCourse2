# RouteConfig #

The `@RouteConfig` decorator is used to define the routing for the component. This is where we can set up the expected paths, the components we want to use, and what we want our application to understand them as. To use `@RouteConfig`, you decorate a class with it, and provide an array containing a [Route Definition Object](#route-definition-object).

Below is the sample RouteConfig defined in the main application component:

```javascript
@RouteConfig([
  { path: "/", redirectTo: "/ComponentOne" },
  { path: "/component-one",    as: "ComponentOne",    component: ComponentOne },
  { path: "/component-two",   as: "ComponentOne",   component: ComponentTwo }
])
export default class Main {

} 
```

## Route Definition Object ##

RouteConfig is a decorator defined in Angular 2 which takes the array of [RouteDefinition](https://angular.io/docs/ts/latest/api/router/RouteDefinition-interface.html) to define routes within the application. Each RouteDefinition could have different attributes; some of the common attributes are:

* _path_ - URL to be shown in the browser when application is on the specific route
* _component_ - Component to be rendered when the application is on the specific route
* _redirectTo_ - Redirect route if needed; each route can have either component or redirect attribute defined in the route
* _name_ or _as_ - Unique identifier for the route to be used within the application, must be CamelCase  
* _useAsDefault_ - Boolean variable which, if set to true, forces the corresponding child route to navigate to it by default
* _data_ - Optional property of any type representing arbitrary route metadata for the given route
* _loader_ - Function that returns a promise that resolves to a component.
