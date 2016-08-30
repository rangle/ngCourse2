# Configuring Routes #

## Base URL Tag ##

The Base URL tag must be set within the `<head>` tag of index.html:

```html
<base href="/">
```

> In the demos we use a script tag to set the base tag. In a real application it must be set as above.

## Route Definition Object ##

The `Routes` type is an array of routes that defines the routing for the application. This is where we can set up the expected paths, the components we want to use and what we want our application to understand them as.

Each route can have different attributes; some of the common attributes are:

* _path_ - URL to be shown in the browser when application is on the specific route
* _component_ - component to be rendered when the application is on the specific route
* _redirectTo_ - redirect route if needed; each route can have either component or redirect attribute defined in the route (covered later in this chapter)
* _pathMatch_ - optional property that defaults to 'prefix'; determines whether to match full URLs or just the beginning. When defining a route with empty path string set pathMatch to 'full', otherwise it will match all paths.
* _children_ - array of route definitions objects representing the child routes of this route (covered later in this chapter).

To use `Routes`, create an array of [route configurations](https://angular.io/docs/ts/latest/api/router/index/Route-interface.html).

Below is the sample `Routes` array definition:

```javascript
const routes: Routes = [
  { path: 'component-one', component: ComponentOne },
  { path: 'component-two', component: ComponentTwo }
];
```

[See Routes definition](https://angular.io/docs/ts/latest/api/router/index/Routes-type-alias.html)

## RouterModule ##

`RouterModule.forRoot` takes the `Routes` array as an argument and returns a _configured_ router module. This router module must be specified in the list of imports of the app module.

```javascript
...
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'component-one', component: ComponentOne },
  { path: 'component-two', component: ComponentTwo }
];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    BrowserModule,
    routing
  ],
  declarations: [
    AppComponent,
    ComponentOne,
    ComponentTwo
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
```
