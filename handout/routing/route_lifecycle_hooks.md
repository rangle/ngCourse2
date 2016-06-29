# Including Route Lifecycle Hooks

Angular 2 routing supports two lifecycle hooks: the `@CanActivate` decorator
and the `CanDeactivate` interface.

These are places where you can perform logic to see if the user is able to navigate to or away from the component.

For example you might use `@CanActivate` to do a permissions check. 
You might use `routerCanDeactivate` to confirm if a user wants to leave a form where there is unsaved data.

Both of these hooks will receive the next and previous `componentInstruction`,
which represent the route you are navigating from and to respectively.

## Example componentInstruction

```javascript
{
  "urlPath": "componentTwo/Route Params In Message",
  "urlParams": [],
  "terminal": true,
  "specificity": 10099,
  "params": {
    "message": "Route Params In Message"
  },
  "reuse": false,
  "routeData": {
    "data": {
      "passedData": "Passed in via Data"
    }
  }
}
```
## `@CanActivate`

Angular 2 uses `@CanActivate` as a decorator, because it is called before an instance if the class is actually created.

If the function returns a true value or a promise that resolves, it will allow the component to activate.
If a false value or a promise that gets rejected is returned, the component will not activate.

```javascript
import {RouteParams, RouteData, CanActivate, CanDeactivate} from '@angular/router-deprecated';

@CanActivate((next: ComponentInstruction, prev: ComponentInstruction)=>{
  return confirm('are you sure you want to go here?')
})
export default class ComponentTwo implements CanDeactivate {
 // ...
}
```

## CanDeactivate

To use the `CanDeactivate` hook, your component must implement the `CanDeactivate` interface, which means your component must have a `routerCanDeactivate` method available on it.

Just like the `@CanActivate`, if a true value/resolving promise is returned, the router will navigate away.
If a false value/rejecting promise is returned, it will stop navigation away from the component.

```javascript
import {RouteParams, RouteData, CanActivate, CanDeactivate} from '@angular/router-deprecated';
export default class ComponentTwo implements CanDeactivate {
// ...
routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
    return confirm('Are you sure you want to leave?');
  }
}
```
[View Example](https://plnkr.co/edit/rPNmG5w18h7sJNeUQW2D?p=preview)
