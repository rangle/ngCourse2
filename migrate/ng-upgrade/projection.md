# Projecting AngularJS Content into Angular Components

In Angular the concept of "transclusion" has been replaced by the concept of projection. ng-upgrade provides mechanisms for projecting/transcluding AngularJS content into Angular components:

This is what a simple Angular component that supports projection looks like:

```javascript
import { Component, Input } from "@angular/core";

@Component({
  selector: "a2-projection",
  template: `
    <p>
      Angular Outer Component (Top)
      <ng-content></ng-content>
      Angular Outer Component (Bottom)
    </p>
  `,
})
export class A2Projection {}
```

Here's a very simple AngularJS directive that will be projected into the Angular component:

```javascript
export function a1ProjectionContentsDirective() {
  return {
    restrict: "E",
    scope: {},
    bindToController: {},
    controller: A1ProjectionContents,
    controllerAs: "a1ProjectionContents",
    template: `<p>{{ a1ProjectionContents.message }}</p>`,
  };
}

class A1ProjectionContents {
  message = 'I am an AngularJS Directive "projected" into Angular';
}
```

Both the component and the directive must be registered with AngularJS:

```javascript
import { A2Projection } from "./components/a2-projection";
import { a1ProjectionContentsDirective } from "./components/a1-projection-contents";

// AngularJS Vendor Import
import * as angular from "angular";

// Import the upgradeAdapter singleton
import { upgradeAdapter } from "./upgrade-adapter";

// Name the application
const APPNAME = "angular-upgrade-example";

// Register classic AngularJS modules
angular
  .module(APPNAME)
  .directive("a2Projection", upgradeAdapter.downgradeNg2Component(A2Projection))
  .directive("a1ProjectionContent", a1ProjectionContentsDirective);
```

Finally, using the HTML selectors is as simple as:

```markup
<a2-projection>
  <a1-projection-content></a1-projection-content>
</a2-projection>
```
