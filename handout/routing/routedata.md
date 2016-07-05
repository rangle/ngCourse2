# Passing Additional Route Data #

While usually parent components pass data to their children, Angular also offers a mechanism to pass additional data to components at the time of the route configuration. For example, besides the data that a component needs for implementing application logic, we may need to pass a flag indicating if the application runs in production environment or not. This can be done by using the data property of the `@RouteConfig` decorator. For example, let's modify the routing for the previous example to add `data` to `ComponentTwo`:

_app/component-two.ts_

```javascript
@RouteConfig([
  { path: '/componentOne', 
    as: 'ComponentOne', 
    useAsDefault: true, 
    component: ComponentOne},
  { path: '/componentTwo/:message',
    as: 'ComponentTwo', 
    component: ComponentTwo, 
    data: { passedData: 'Passed in via Data'}}
  ])
export class SimpleRouting {
  
}
```

Accordingly, the constructor of the `ComponentTwo` will need an extra argument of type RouteData:

```javascript
import {Component} from '@angular/core';
import {RouteParams, RouteData} from '@angular/router-deprecated';
@Component({
  selector: 'component-two',
  template: `Component two:
  <p>Message: {{message}}</p>
  <p>Data: {{data}}</p>`
  
})
export default class ComponentTwo { 
  public message:string;
  public data:string;
  
  constructor(private routeParams: RouteParams, private routeData: RouteData) {
    this.message = this.routeParams.get('message');
    this.data = this.routeData.get('passedData')
  }
}
```
[View Example](https://plnkr.co/edit/K9hYyLgue2awis2PbnSI?p=preview)

Passing data to a route with `RouteData` is not an alternative to `RouteParams`. While `RouteParams` is used to pass the data from one route to another based on the user’s selections (e.g. show details of the selected product), `RouteData` can come in handy when you need to pass some data to a route during the configuration phase, e.g. is it a production or QA environment, should the user have administrator’s privileges, or what URL to use for the product service.
