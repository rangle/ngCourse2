# Using Routing with LocationStrategy #

Angular 2 exposes the concept of a `LocationStrategy` which is responsible for
representing and reading route state from the browser's URL. Angular provides
two strategies: `PathLocationStrategy` (default) and `HashLocationStrategy`.  
Applications should use the Router or Location services to interact with
application route state.

**`PathLocationStrategy`** is a LocationStrategy used to configure the Location
service to represent its state in the path of the browser's URL. This is a very
natural approach, since it makes your single-page app behave
similarly to normal web pages from the end user's point of view. For this reason,
it is the default location strategy in Angular 2.

However, for it to work correctly, your server must be configured to respond
with your app's `index.html` whenever an unknown path is requested by the browser;
this allows your application to 'rehydrate' to the correct route on the client side.

You can customize this rehydration to use a specific HTML base URL by supplying
a provider for APP_BASE_HREF set to the base URL of your page. For instance,
if you provide an APP_BASE_HREF of '/my/app' and call location.go('/foo'), the
browser's URL will become example.com/my/app/foo.

By default, Angular will use a base href of '/'.

**`HashLocationStrategy`** is useful for cases where you aren't able to configure
the server in this way. It represents the routing state in the hash fragment of
the browser's URL.

For instance, if you call `location.go('/foo')`, the browser's URL will become `example.com/#/foo`.

This is essentially what was the default in Angular 1, since it allows you to
use routing in your app and support 'deep linking' without requiring special
configuration of your app's HTTP server.

However, using URL fragments in this way is uglier and is at odds with the
conventional semantics of URLs.

You also need to explicitly provide the `HashLocationStrategy` class to Angular's
dependency injector, as follows.

The following code shows how to configure HashLocationStrategy:

```javascript
import {RouterApp} from './router-app/router-app';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {LocationStrategy, Location, HashLocationStrategy } from '@angular/common';

export function main() {
  return bootstrap(RouterApp, [
      ROUTER_PROVIDERS,
      provide(LocationStrategy, { useClass: HashLocationStrategy })
  ])
}
```
