# Using Auxiliary Routes #

Angular 2 supports the concept of auxiliary routes. Before we go further, we must understand what an auxiliary route is. Auxiliary routes allow you to set up and navigate multiple independent routes in a single app. Each component has one primary route and zero or more auxiliary outlets. Auxiliary outlets must have unique name within a Component. 

To define the auxiliary route we must first add the router outlet where contents for the auxiliary route gets rendered. Sample for the auxiliary route outlet is shown below.

```ts
@Component({
	selector: 'simple-routing',
	directives: [ROUTER_DIRECTIVES]
	template: `<div>
  <!-- ... -->
  <div style="border: 1px solid red;">
  <h3>Default Route Outlet</h3>
    <router-outlet></router-outlet>
  </div>
  <div style="border: 1px solid blue;">
  <h3>Test Aux 1</h3>
    <router-outlet name="testAux1"></router-outlet>
  </div>
  <!-- ... -->
	`
})
@RouteConfig([
  { path: '/',
    component: ComponentOne,
    as: 'ComponentOne',
    useAsDefault: true
  },
   {
    aux: 'testAux1',
    component: ComponentOne,
    name: 'TestAux1',
    path: '/aux1'
  },
    {
    aux: 'testAux2',
    component: ComponentTwo,
    name: 'TestAux2',
    path: '/aux2'
  }
])
export class SimpleRouting {
  
}
```

Next, we need to define the link to the auxiliary route for the application to navigate and render the contents.
```javascript
<a [routerLink]="['./ComponentOne',['TestAux1']]">Test Aux</a>
```
[View Example](http://plnkr.co/edit/USxVl4rBpIPs5Zi3s0pb?p=preview)

Each auxiliary route is an independent route which:

* Can have their own child routes
* Can have their own auxiliary routes
* Have their own route-params
* Can have their own history stack 



## RouteParams ##

`RouteParams` is an immutable map of parameters for the given route based on the url matcher and optional parameters for that route.

You can inject `RouteParams` into the constructor of a component to use it.

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

And to access the `RouteParams` in `ComponentTwo`,

_app/component-two.ts_
```ts
import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
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
[View Example](http://plnkr.co/edit/Sf54bMaDtfVGOwUAcmzv?p=preview)

