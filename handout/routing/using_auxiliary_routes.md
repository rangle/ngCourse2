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




