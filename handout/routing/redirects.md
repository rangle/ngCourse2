# Redirecting the Router to Another Route #

When your application starts, it navigates to the empty route by default.
We can configure the router to redirect to a named route by default:

```javascript
export const routes: Routes = [
  { path: '', redirectTo: 'component-one', pathMatch: 'full' },
  { path: 'component-one', component: ComponentOne },
  { path: 'component-two', component: ComponentTwo }
];
```

The `pathMatch` property, which is required for redirects, tells the router how it should match the URL provided in order to redirect to the specified route. Since `pathMatch: full` is provided, the router will redirect to `component-one` if the entire URL matches the empty path ('').

When starting the application, it will now automatically navigate to the route for `component-one`.
