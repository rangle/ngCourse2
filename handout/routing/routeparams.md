# Using Route Parameters #

Say we are creating an application that displays a product list. When the user clicks on a product in the list, we want to display a page showing the detailed information about that product. To do this you must:

* add a route parameter ID
* link the route to the parameter
* add the service that reads the parameter.

## Declaring Route Parameters ##

The route for the component that displays the details for a specific product would need a route parameter for the ID of that product. We could implement this using the following `Routes`:

```javascript
export const routes: Routes = [
  { path: '', redirectTo: 'product-list', pathMatch: 'full' },
  { path: 'product-list', component: ProductList },
  { path: 'product-details/:id', component: ProductDetails }
];
```

Note `:id` in the path of the `product-details` route, which places the parameter in the path. For example, to see the product details page for product with ID 5, you must use the following URL:
`localhost:3000/product-details/5`

## Linking to Routes with Parameters ##

In the `ProductList` component you could display a list of products. Each product would have a link to the `product-details` route, passing the ID of the product:

```html
<a *ngFor="let product of products"
  [routerLink]="['/product-details', product.id]">
  {{ product.name }}
</a>
```

Note that the `routerLink` directive passes an array which specifies the path and the route parameter. Alternatively we could navigate to the route programmatically:

```javascript
goToProductDetails(id) {
  this.router.navigate(['/product-details', id]);
}
```

## Reading Route Parameters ##

The `ProductDetails` component must read the parameter, then load the product based on the ID given in the parameter.

The `ActivatedRoute` service provides a `params` Observable which we can subscribe to to get the route parameters (see [Observables](/handout/observables/README.md)).

```javascript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-details',
  template: `
    <div>
      Showing product details for product: {{id}}
    </div>
  `,
})
export class LoanDetailsPage implements OnInit, OnDestroy {
  id: number;
  private sub: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
```

> The reason that the `params` property on `ActivatedRoute` is an Observable is that the router may not recreate the component when navigating to the same component. In this case the parameter may change without the component being recreated.


[View Basic Example](https://plnkr.co/edit/d7dE9TE0rN9gkqLTS9f5?p=preview)

[View Example with Programmatic Route Navigation](https://plnkr.co/edit/H04aObLCjsL5oQIjB6el?p=preview)

> View examples running in full screen mode to see route changes in the URL.
