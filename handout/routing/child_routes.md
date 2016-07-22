# Child Routes #

Sometimes it makes sense to organize your routes such that some routes are children of others. When some routes may only be accessible & viewed within other routes it may be appropriate to create them as child routes.

For example: The product details page may have a tabbed navigation section within the page where by default it shows the overview description of the product. When the user clicks the "Technical Specs" tab the section shows the specs instead of the overview.

If the user clicks on product with ID 3, we want to show the product details page with the overview:

`localhost:3000/product-details/3/overview`

When the user clicks "Technical Specs":

`localhost:3000/product-details/3/specs`

`overview` and `specs` are child routes of `product-details/:id`. They are only reachable within product details.

Our `RouteConfig` with children would look like:

```javascript
export const routes: RouterConfig = [
  { path: '', redirectTo: 'product-list', pathMatch: 'full' },
  { path: 'product-list', component: ProductList },
  { path: 'product-details/:id', component: ProductDetails,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: Overview },
      { path: 'specs', component: Specs }
    ]
  }
];
```

Where would the components for these child routes be displayed? Just like we had a `<router-outlet></router-outlet>` for the root application component, we would have a router outlet inside the `ProductDetails` component. The components corresponding to the child routes of `product-details` would be placed in the router outlet in `ProductDetails`.

```javascript
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-details',
  template: `
    <p>Product Details: {{id}}</p>
    <!-- Product information -->
    <nav>
      <a [routerLink]="['overview']">Overview</a>
      <a [routerLink]="['specs']">Technical Specs</a>
    </nav>
    <router-outlet></router-outlet>
    <!-- Overview & Specs components get added here by the router -->
  `,
  directives: [ROUTER_DIRECTIVES]
})
export default class ProductDetails {
  private id;

  constructor(private route: ActivatedRoute) {}

  private ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number
    });
  }

  private ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
```

Alternatively, we could also specify the route such that the `overview` route URL simply be:

`localhost:3000/product-details/3`

```javascript
export const routes: RouterConfig = [
  { path: '', redirectTo: 'product-list', pathMatch: 'full' },
  { path: 'product-list', component: ProductList },
  { path: 'product-details/:id', component: ProductDetails,
    children: [
      { path: '', component: Overview },
      { path: 'specs', component: Specs }
    ]
  }
];
```
Since the `Overview` child route of `product-details` has an empty path, it will be loaded by default. The `specs` child route remains the same.

[View Example with child routes](https://plnkr.co/edit/QlMe6pMINxJGTdA3xm0B?p=preview)

[View Example with route params & child routes](https://plnkr.co/edit/g88pvg4LQq7XVJo7iG9b?p=preview)

> View examples running in full screen mode to see route changes in the URL.

## Accessing a Parent's Route Params ##

In the above example, say that the child routes of `product-details` needed the ID of the product to fetch the spec or overview information. The child route component can access the parent route's params as follows:

```javascript
export default class Overview {
  private sub: any;
  private parentRouteId: number;

  constructor(private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    // Get parent ActivatedRoute of this route.
    this.sub = this.router.routerState.parent(this.route)
      .params.subscribe(params => {
        this.parentRouteId = +params["id"];
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
```

[View Example child routes accessing parent's route params](https://plnkr.co/edit/Lk8DMrOlGRYPKQtIDEkN?p=preview)

> View examples running in full screen mode to see route changes in the URL.

## Links ##

Routes can be prepended with `/`, or `../`; this tells Angular 2 where in the route tree to link to.

| Prefix | Looks in
|--------|---
| `/`    | Root of the application
| none   | Current component children routes
| `../`  | Current component parent routes

Example:

```html
<a [routerLink]="['route-one']">Route One</a>
<a [routerLink]="['../route-two']">Route Two</a>
<a [routerLink]="['/route-three']">Route Three</a>
```

In the above example, the link for route one links to a child of the current route.
The link for route two links to a sibling of the current route.
The link for route three links to a child of the root component (Same as route one link if current route is root component).

[View Example with linking throughout route tree](https://plnkr.co/edit/6Mdn7qUblMtktpQyFJAc?p=preview)

> View examples running in full screen mode to see route changes in the URL.