# Projection

In Angular 2 the concept of "transclusion" has been replaced by the concept of
projection.  ng-upgrade provides mechanisms for projecting/transcluding
Angular 1.x content into Angular 2 components:

This is what a simple Angular 2 component that supports projection looks like:

```js
import {Component, Input} from '@angular/core';

@Component({
  selector: 'a2-projection',
  template: `
  <p>
  Angular 2 Outer Component (Top)
  <ng-content></ng-content>
  Angular 2 Outer Component (Bottom)
  </p>
  `
})
export class A2Projection { }

```

Here's a very simple Angular 1.x directive that will be projected into the 
Angular 2 component:

```js
export function a1ProjectionContentsDirective() {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {},
    controller: A1ProjectionContents,
    controllerAs: 'a1ProjectionContents',
    template: `<p>{{ a1ProjectionContents.message }}</p>`
  };
}

class A1ProjectionContents {
  message = 'I am an Angular 1 Directive "projected" into Angular 2';
}
```

Both the component and the directive must be registered with Angular 1.x:

```js
import {A2Projection} from './components/a2-projection';
import {a1ProjectionContentsDirective} from
  './components/a1-projection-contents';

// Angular 1 Vendor Import
import * as angular from 'angular';

// Import the upgradeAdapter singleton
import {upgradeAdapter} from './upgrade-adapter';

// Name the application
const APPNAME = 'angular-upgrade-example';

// Register classic Angular 1 modules
angular
  .module(APPNAME)
  .directive('a2Projection',
    upgradeAdapter.downgradeNg2Component(A2Projection))
  .directive('a1ProjectionContent', a1ProjectionContentsDirective);

```

Finally, using the HTML selectors is as simple as:

```html
<a2-projection>
  <a1-projection-content></a1-projection-content>
</a2-projection>
```
