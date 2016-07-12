# RouterOutlet #

A `RouterOutlet` is a placeholder that Angular dynamically fills based on the application's route. The component for the route being activated is created & inserted next to the `<router-outlet></router-outlet>` element. In order to make use of the `RouterOutlet` we must give component access to the router components by passing `ROUTER_DIRECTIVES` in the component directives array.

```javascript
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'app',
  directives: [ROUTER_DIRECTIVES],
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

[View Example](https://plnkr.co/edit/1c1p877ewo885VaF0KQO?p=preview)

> View examples running in full screen mode to see route changes in the URL.