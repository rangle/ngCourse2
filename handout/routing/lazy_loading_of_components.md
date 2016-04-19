# Lazy Loading of Components #

Angular 2's router also provides the ability to defer navigation until some
loading code is executed.

We can do this by configuring an `AsyncRoute` as shown below:

```javascript
import {RouteConfig, AsyncRoute} from 'angular2/router';

@RouteConfig([
  new AsyncRoute({
      path: '/lazy',
      loader: () => ComponentHelper.LoadComponentAsync('LazyLoaded','./components/lazy-loaded/lazy-loaded'),
      name: 'Lazy'
  })
])
@Component({ /* ... */ })
class App { /* ... */}
```

In this case, `loader` can be set to a function that returns a promise that
resolves to a component.

This feature is analogous to Angular 1's `resolve` feature. However we recommend
against using it for similar reasons - delaying navigation is bad user experience
because the UI provides no feedback. It's usually better to navigate to the component
immediately, and build some kind of progress UI into the component itself so
the user knows that the app is OK and isn't hanging due to a bug.
