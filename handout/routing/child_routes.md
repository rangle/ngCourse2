# Defining Child Routes #

When some routes may only be accessible and viewed within other routes it may be appropriate to create them as child routes.

For example: The product details page may have a tabbed navigation section that shows the product overview by default. When the user clicks the "Technical Specs" tab the section shows the specs instead.

If the user clicks on the product with ID 3, we want to show the product details page with the overview:

`localhost:3000/product-details/3/overview`

When the user clicks "Technical Specs":

`localhost:3000/product-details/3/specs`

`overview` and `specs` are child routes of `product-details/:id`. They are only reachable within product details.

Our `Routes` with children would look like:

```javascript
export const routes: Routes = [
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
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  `
})
export default class ProductDetails implements OnInit, OnDestroy {
  id: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
```

Alternatively, we could specify `overview` route URL simply as:

`localhost:3000/product-details/3`

```javascript
export const routes: Routes = [
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

[View Example with child routes](https://plnkr.co/edit/5sgMKcCtAluRuyz7VZRZ?p=preview)

[View Example with route params & child routes](https://plnkr.co/edit/nCYxArisezQAqnPTLa7B?p=preview)

> View examples running in full screen mode to see route changes in the URL.

## Accessing a Parent's Route Parameters ##

In the above example, say that the child routes of `product-details` needed the ID of the product to fetch the spec or overview information. The child route component can access the parent route's parameters as follows:

```javascript
export default class Overview {
  parentRouteId: number;
  private sub: any;

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

[View Example child routes accessing parent's route parameters](https://plnkr.co/edit/7bLPo9NHpxSdsbimUAoj?p=preview)

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
The link for route three links to a child of the root component (same as route one link if current route is root component).

[View Example with linking throughout route tree](https://plnkr.co/edit/UYBPrTAodRHFmbfRJoXz?p=preview)

> View examples running in full screen mode to see route changes in the URL.
