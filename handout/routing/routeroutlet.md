# Dynamically Adding Route Components #

Rather than define each route's component separately, use `RouterOutlet` which serves as a component placeholder; Angular 2 dynamically adds the component for the route being activated into the `<router-outlet></router-outlet>` element.

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <nav>
      <a [routerLink]="['/component-one']">Component One</a>
      <a [routerLink]="['/component-two']">Component Two</a>
    </nav>

    <router-outlet></router-outlet>
    <!-- Route components are added by router here -->
  `
})
export class AppComponent {}
```

In the above example, the component corresponding to the route specified will be placed after the `<router-outlet></router-outlet>` element when the link is clicked.

[View Example](https://plnkr.co/edit/meHbc7zXVFRLiHXYlYXt?p=preview)

> View examples running in full screen mode to see route changes in the URL.
