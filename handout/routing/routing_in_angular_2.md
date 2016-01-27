# Routing in Angular 2 ##

The Angular 2 team reworked routing from the ground up in Angular 2. The new component router allows you to configure routes using annotation on the main app component and map each of the routes to the corresponding components. There are 3 main components used to configure routing: 

* [RouteConfig](https://angular.io/docs/ts/latest/api/router/RouteConfig-decorator.html): Annotation similar to View and Component used to define the routes in the main app
* [RouterOutlet](https://angular.io/docs/ts/latest/api/router/RouterOutlet-directive.html): Its a placeholder ~~component~~ directive similar to ng-view that renders the content of each route
* [RouterLink](https://angular.io/docs/ts/latest/api/router/RouterLink-directive.html): Used to define links to the different routes within the application

Refer to the [official documentation](https://angular.io/docs/ts/latest/guide/router.html) for more information.

Angular 2's component router, also allows for child routes, lazy loading of routing data, and a new concept called Auxiliary Routes, which we will be covering in this section. First, lets take a look at the `@RouteConfig` decorator, and how it is used.

