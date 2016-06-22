## RouteParams ##

`RouteParams` is an immutable map of parameters for the given route based on the URL matcher and optional parameters for that route.

You can inject `RouteParams` into the constructor of a component to use it:

_app/app.component.ts_
```javascript
// ....
@Component({
	selector: 'simple-routing',
	directives: [ROUTER_DIRECTIVES]
	template: `<div>
	Basic Routing
	<ul>
	  <li><a [routerLink]="['/ComponentOne']">Component One</a></li>
	  <li><a [routerLink]="['/ComponentTwo',{message:'Route Params In Message'}]">Component Two</a></li>
	</ul>
	<div style="border: 1px solid black">
	  <router-outlet></router-outlet>
	</div>
	
	`
})
@RouteConfig([
  {path: '/componentOne', as: 'ComponentOne', useAsDefault: true, component: ComponentOne},
  {path: '/componentTwo/:message', as: 'ComponentTwo', useAsDefault: false, component: ComponentTwo}
  ])
export class SimpleRouting {
  
}
```

And to access the `RouteParams` in `ComponentTwo`:

_app/component-two.ts_
```js
import {Component} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';
@Component({
  selector: 'component-two',
  template: 'Component two: {{ message }}'
})
export default class ComponentTwo { 
  public message:string;
  constructor(private routeParams: RouteParams) {
    this.message = this.routeParams.get('message');
  }
}
```
[View Example](https://plnkr.co/edit/rF6ZiDuaBbAo24m3c3qg?p=preview)
