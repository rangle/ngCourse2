# RouterOutlet #

A `RouterOutlet` is a placeholder that Angular dynamically fills based on the application's route. Below is the example how we use the `RouterOutlet` in  Angular 2 inside the template. In order to make use of the `RouterOutlet` we need to give component access to the Router Components we do it by passing `ROUTER_DIRECTIVES` in the component directives array.

A component can only have one unnamed `router-outlet` per-template. If you need to use multiple `router-outlets`, they must be provided a name, which will be covered in the [Auxiliary Routes](#using-auxiliary-routes) section.

Below is the example of how we use the RouterOutlet in Angular 2

```javascript
// ...
@Component({
	selector: 'simple-routing',
	directives: [ROUTER_DIRECTIVES]
	template: `<div>
	Basic Routing
	<ul>
	  <li><a [routerLink]="['/ComponentOne']">Component One</a></li>
	  <li><a [routerLink]="['/ComponentTwo']">Component Two</a></li>
	</ul>
	<div style="border: 1px solid black">
	  <router-outlet></router-outlet>
	</div>

	`
})
@RouteConfig([
  {path: '/componentOne', as: 'ComponentOne', useAsDefault: true, component: ComponentOne},
  {path: '/componentTwo', as: 'ComponentTwo', useAsDefault: false, component: ComponentTwo}
  ])
export class SimpleRouting {

}
// ...
```
[View Example](http://plnkr.co/edit/xZLEIX601g0TqsEOyB8y?p=preview)
