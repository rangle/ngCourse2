# RouteConfig #

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

## Route Definition Object ##

RouteConfig is a decorator defined in Angular 2 which takes the array of [RouteDefinition](https://angular.io/docs/ts/latest/api/router/RouteDefinition-interface.html) to define routes within the application. Every RouteDefinition can have different attributes. Some of the common attributes for the RouteDefinition are:

* **path**: Url to be shown in the browser when application in on the specific route
* **component**: Component to be rendered when the application is on the specific route
* **redirectTo**: Redirect route if needed, each route can have either component or redirect attribute defined in the route
* **name** or **as**: Unique identifier for the route to be used within the application must be CamelCase  
* **useAsDefault**: It's a boolean variable which If set to true, the corresponding child route will navigate to it by default
* **data**: It is an optional property of any type representing arbitrary route metadata for the given route
* **loader**: It is a function that returns a promise that resolves to a component

