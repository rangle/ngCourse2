# Query Parameters #

Query parameters allow you to pass optional parameters to a route such as pagination information.

For example: on a route with a paginated list, the URL might look like the following to indicate that we've loaded the 2nd page:

`localhost:3000/product-list?page=2`

## Query Parameters vs Route Parameters ##

The key difference between query parameters and [route parameters](/handout/routing/routeparams.md) is that route parameters are essential to determining route, whereas query parameters are optional.

## Passing Query Parameters ##

We can use the `[queryParams]` directive along with `[routerLink]` to pass query parameters.

Example:

```html
<a [routerLink]="['product-list']" [queryParams]="{ page: 99 }">Go to Page 99</a>
```

Alternatively, we can navigate programmatically using the `Router` service:

```javascript
  goToPage(pageNum) {
    this.router.navigate(['/product-list'], { queryParams: { page: pageNum } });
  }
```

## Reading Query Parameters ##

Similar to reading [route parameters](/handout/routing/routeparams.md), the `Router` service returns an [Observable](/handout/observables/README.md) we can subscribe to to read the query parameters:

```javascript
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'product-list',
  template: `<!-- Show product list -->`
})
export default class ProductList {
  constructor(private router: Router) {}

  ngOnInit() {
    this.sub = this.router
      .routerState
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.page = +params['page'] || 0;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  nextPage() {
    this.router.navigate(['product-list'], { queryParams: { page: this.page + 1 } });
  }
}
```

[View Example](http://plnkr.co/edit/WxqO2UtJUaYMy3Rit9A7?p=preview)

[See Official Documentation on Query Parameters](https://angular.io/docs/ts/latest/guide/router.html#!#query-parameters)