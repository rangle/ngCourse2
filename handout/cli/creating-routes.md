# Generate Routes

The `ng g route [route-name]` command will spin up a new folder and route files for you. It will also insert the route into the parent component's `@Routes` decorator.  For example, `ng g route myRoute` adds a route to the main component and creates the following files:

* +my-route/
  * shared/
  * index.ts
  * my-route.component.css
  * my-route.component.html
  * my-route.component.ts
  * my-route.component.spec.ts

It also adds the path to the root component's `@Route` decorator:

```js
@Routes([
  {path: '/my-route', component: MyRouteComponent}
])
```

By default, routes are created as lazy routes (and indicated with a `+` in the folder name) - meaning it will only be loaded into the browser when needed. You can turned this off using the flag `--lazy false`
