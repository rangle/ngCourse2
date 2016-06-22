# Routing in Angular 2 ##

The Angular 2 team reworked routing from the ground up. The new component router allows you to configure routes using annotation on the main app component and map each route to the corresponding component. There are three main components used to configure routing: 

* [RouteConfig](https://angular.io/docs/ts/latest/api/router/RouteConfig-decorator.html) - Annotation similar to View and Component used to define the routes in the main app
* [RouterOutlet](https://angular.io/docs/ts/latest/api/router/RouterOutlet-directive.html) - Placeholder directive similar to ng-view that renders the content of each route
* [RouterLink](https://angular.io/docs/ts/latest/api/router/RouterLink-directive.html) - Used to define links to the different routes within the application.

Refer to the [official documentation](https://angular.io/docs/ts/latest/guide/router.html) for more information.

Angular 2's component router also allows for child routes, lazy loading of routing data, and a new concept called Auxiliary Routes, which we will cover in this section. First, let's take a look at the `@RouteConfig` decorator and how it is used.

