# Using Routing with LocationStrategy #

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

