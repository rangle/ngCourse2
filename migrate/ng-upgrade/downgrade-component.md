# Downgrading Components

Upgrading components sounds like it should happen before downgrading, but the point of upgrading is to make an AngularJS component work with Angular. For an Angular component to use an AngularJS component in an ng-upgrade application there must first be a downgraded Angular component. Consequently it's important to first learn how to downgrade Angular components to work with AngularJS

All downgraded components operate like AngularJS `'E'` element directives.

Here is an example of a very simple Angular component:

```javascript
import { Component } from "@angular/core";

@Component({
  selector: "a2-downgrade",
  template: "<p>{{ message }}</p>",
})
export class A2DowngradeComponent {
  message =
    `What you're seeing here is an Angular component ` +
    `running in an AngularJS app!`;
}
```

Registering the downgraded component with AngularJS:

```javascript
// AngularJS Vendor Import
import * as angular from "angular";

// Import the upgradeAdapter singleton
import { upgradeAdapter } from "./upgrade-adapter";

// Angular component from above
import { A2DowngradeComponent } from "./components/a2-downgrade";

// Register classic AngularJS modules
angular
  .module(APPNAME)
  .directive(
    "a2Downgrade",
    upgradeAdapter.downgradeNg2Component(A2DowngradeComponent)
  );
```
