## Part 9: Routing ##

Routing is a way to break the application into different modules based on the URL in the browser.

### Why Routing ? ###
* Useful to maintain the state of the application
* Modular Applications
* Implmenting the application based on the roles (certain roles have access to certain url's)
* Many More

### Angular 1 ###
In Angular 1 we used to define routes like below using the ** UI-Router ** we defined the states and substates using state provider. In defining every route we define four properties.
* State: Unique name for each route being defined
* Url: Url to be shown in the browser when user in on the particular route
* Template / TemplateUrl: Template or Url for the view to be rendered when application is on the specific route
* Controller: Page controller to handle functionality on the page   

``` javascript
$stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl as vm'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl as vm'
      });

    $urlRouterProvider.otherwise('/');
```

Apart from defining the route above we also have **ng-view** directive which needs to be defined in the html to render the page

``` html
<body>
    <html>
        <div class="container" ng-view />
    </html>
</body>
```
### Angular 2 ###

Angular2 team reworked on the routing from ground up in Angular2. The new component router allows you to configure routes using annotation on the main app component and map each of the routes to the corresponding components. There are 3 main components used to configure routing 

* RouteConfig: Annotation similar to View and Component used to define the routes in the main app
* RouterOutlet: Its a placeholder component similar to ng-view that renders the content of each route
* RouterLink: Used to define links to the different routes within the application

***RouteConfig***

Below is the sample RouteConfig defined in the main application component.
```javascript
@RouteConfig([
  { path: "/", redirectTo: "/todo" },
  { path: "/todo",    as: "Todo",    component: TodoComponent },
  { path: "/help",   as: "Help",   component: HelpComponent }
]) 
```

RouteConfig is a decorator defined in Angular2 which takes the array of RouteDefinition to define routes within the application. Every RouteDefinition can have different attributes. Some of the common attributes for the RouteDefinition are:-

* path: Url to be shown in the browser when application in on the specific route
* component: Component to be rendered when the application is on the specific route
* redirectTo: Redirect route if needed, each route can have either component or redirect attribute defined in the route
* name or as: Unique identifier for the route to be used within the application must be CamelCase  
* useAsDefault: It's a boolean variable which If set to true, the corresponding child route will navigate to it by default
* data: It is an optional property of any type representing arbitrary route metadata for the given route
* loader: It is a function that returns a promise that resolves to a component

***RouterOutlet***

A router outlet is a placeholder that Angular dynamically fills based on the application's route. Below is the example how we use the RouterOutlet in  Angular2 inside the template. In order to make use of the RouterOutlet we need to give component access to the Router Components we do it by passing **ROUTER_DIRECTIVES** in the component directives array. 

```javascript
...
@View({
  directives: [ROUTER_DIRECTIVES],
  template: `
  <div>
    <main>
      <router-outlet></router-outlet>
    </main>
  </div>
  `
})
...
```

***RouterLink***

After declaring routes and adding the outlet we need to tell angular how to navigate between the routes. We can do it in differnet ways we like. One is using plain old href links in the templates as shown below

```html
<nav>
    <a href="/todo">Todo</a>
    <a href="/help">Help</a>
</nav>
```

Other way is define them using the RouterLink. The RouterLink directive lets you link to specific parts of your app. Example of defining route using RouterLink is shown below.

```html
<nav>
    <a [routerLink]="['/Todo']">Todo</a>
    <a [routerLink]="['/Help']">Help</a>
</nav>
```

If we want to define routes with parameters we need to pass the specific parameter value after each route in the routerLink array as shown below.

```html
<nav>
    <a [routerLink]="['/Team', {teamId: 1}, 'User', {userId: 2}]">Sam Hans</a>
    <a [routerLink]="['/Help']">Help</a>
</nav>
```

The first route name should be prepended with /, ./, or ../. If the route begins with /, the router will look up the route from the root of the app. If the route begins with ./, the router will instead look in the current component's children for the route. And if the route begins with ../, the router will look at the current component's parent.

***Creating Child Routes***

To declare the child routes in the application we declare the main route in the main app and then define specific child routes in the main child component. 

```javascript
@RouteConfig([
  .....
  { path: '/start/...', component: Start, as: 'Start'},
  .....  
])
``` 
In the above example we define the main /start route which maps to the Start ... dots at the end of the route tells Angular that it has associated child routes with it. Next in the child Start Component we need to do two things:-
* Define the RouterOutlet view where child routes gets rendered
* Set up child routes in the component itself

Below is the sample of Child component with routes and View defined.

```javascript
@Component({
  selector: 'start'
})
@RouteConfig([
  {path: '/', component: StartMain, as: 'StartMain'  },
  {path: '/child', component: StartChild, as: 'StartChild'  }
])
@View({
  directives: [RouterLink, ROUTER_DIRECTIVES],
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

***Using routing with LocationStrategy***

Angular 2 supports LocationStrategy which is responsible for representing and reading route state from the browser's URL. Angular provides two strategies: HashLocationStrategy (default) and PathLocationStrategy. They both use location service under the hood. Applications should use the Router or Location services to interact with application route state.

* HashLocationStrategy is a LocationStrategy used to configure the Location service to represent its state in the hash fragmentof the browser's URL.
For instance, if you call location.go('/foo'), the browser's URL will become example.com/#/foo.

Below Code shows how to configure HashLocationStrategy
```javascript
import {RouterApp} from './router-app/router-app';
export function main() {
  return bootstrap(RouterApp, [
      ROUTER_PROVIDERS,
      provide(LocationStrategy, { useClass: HashLocationStrategy })
  ])
}
```

* PathLocationStrategy is a LocationStrategy used to configure the Location service to represent its state in the path of the browser's URL.
PathLocationStrategy is the default binding for LocationStrategy provided in ROUTER_PROVIDERS. If you're using PathLocationStrategy, you must provide a provider for APP_BASE_HREF to a string representing the URL prefix that should be preserved when generating and recognizing URLs.
For instance, if you provide an APP_BASE_HREF of '/my/app' and call location.go('/foo'), the browser's URL will become example.com/my/app/foo.

Below Code shows how to configure PathLocationStrategy
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


***Using Auxiliary routes***

Angular 2 supports concept of auxiliary routes. Before we go further we must understand what are auxiliary routes. Auxiliary routes allow you to set up and navigate multiple independent routes in a single app. Each component has one primary route and zero or more auxiliary outlets. Auxiliary outlets must have unique name within a Component. 

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

To lazy load the component and deffer the initalization till the component is loaded. For that angular 2 provides AsyncRoute route. We define the route in route config as shown below.

```javascript
new AsyncRoute({
        path: '/lazy',
        loader: () => ComponentHelper.LoadComponentAsync('LazyLoaded','./components/lazy-loaded/lazy-loaded'),
        name: 'Lazy'
    })
```

***RouteParams***

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

***RouteData***

While most of the times parent components will be passing data to their children, Angular also offers a mechanism to pass additional data to components at the time of the route configuration. For example, besides the data that a component needs for implementing application logic, we may need to pass a flag indicating if the application runs in production environment or not. This can be done by using the data property of the @RouteConfig annotation. For example, our ProductDetail route can be configured as follows:

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