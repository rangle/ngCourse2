# Lazy Loading of Components #

To lazy load the component and defer the initialization till the component is loaded. For that Angular 2 provides AsyncRoute route. We define the route in route config as shown below.

```javascript
new AsyncRoute({
        path: '/lazy',
        loader: () => ComponentHelper.LoadComponentAsync('LazyLoaded','./components/lazy-loaded/lazy-loaded'),
        name: 'Lazy'
    })
```
