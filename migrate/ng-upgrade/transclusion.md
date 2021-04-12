# Transcluding Angular Components into AngularJS Directives

Angular components can be transcluded into AngularJS directives.

Here is a very simple Angular component:

```javascript
import { Component } from "@angular/core";

@Component({
  selector: "a2-transclusion-contents",
  template: `<p>{{ message }}</p>`,
})
export class A2Transclusion {
  message = 'I am an Angular Component "transcluded" into AngularJS';
}
```

Here is an AngularJS directive that supports transclusion:

```javascript
export function a1TransclusionDirective() {
  return {
    restrict: "E",
    transclude: true,
    scope: {},
    bindToController: {},
    controller: A1Transclusion,
    controllerAs: "a1ProjectionContents",
    template: `
    <p>
      <ng-transclude></ng-transclude>
    </p>
    `,
  };
}

class A1Transclusion {}
```

AngularJS needs to know about both the component and the directive:

```javascript
import { A2Transclusion } from "./components/a2-transclusion-contents";
import { a1TransclusionDirective } from "./components/a1-transclusion";

// AngularJS Vendor Import
import * as angular from "angular";

// Import the upgradeAdapter singleton
import { upgradeAdapter } from "./upgrade-adapter";

// Name the application
const APPNAME = "angular-upgrade-example";

// Register classic AngularJS modules
angular
  .module(APPNAME)
  .directive(
    "a2TransclusionContents",
    upgradeAdapter.downgradeNg2Component(A2Transclusion)
  )
  .directive("a1Transclusion", a1TransclusionDirective);
```

Finally, Angular content can be transcluded into AngularJS 1.x like so:

```markup
<a1-transclude>
  <a2-transclusion-contents></a2-transclusion-contents>
</a1-transclude>
```
