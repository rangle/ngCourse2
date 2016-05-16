# Transclusion

Angular 2 components can be transcluded into Angular 1.x directives.

Here is a very simple Angular 2 component:

```js

import {Component} from '@angular/core';

@Component ({
  selector: 'a2-transclusion-contents',
  template: `<p>{{ message }}</p>`
})
export class A2Transclusion {
  message =
    'I am an Angular 2 Component "transcluded" into Angular 1.x';
}
```

Here is an Angular 1.x directive that supports transclusion:

```js

export function a1TransclusionDirective() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    bindToController: {},
    controller: A1Transclusion,
    controllerAs: 'a1ProjectionContents',
    template: `
    <p>
      <ng-transclude></ng-transclude>
    </p>
    `
  };
}

class A1Transclusion {
}
```

Angular 1.x needs to know about both the component, and the directive:

```js

import {A2Transclusion} from './components/a2-transclusion-contents';
import {a1TransclusionDirective} from './components/a1-transclusion';

// Angular 1 Vendor Import
import * as angular from 'angular';

// Import the upgradeAdapter singleton
import {upgradeAdapter} from './upgrade-adapter';

// Name the application
const APPNAME = 'angular-upgrade-example';

// Register classic Angular 1 modules
angular
  .module(APPNAME)
  .directive('a2TransclusionContents',
    upgradeAdapter.downgradeNg2Component(A2Transclusion))
  .directive('a1Transclusion', a1TransclusionDirective);
```

Finally, Angular 2 content can be transcluded into Angular 1.x like so:

```html

<a1-transclude>
  <a2-transclusion-contents></a2-transclusion-contents>
</a1-transclude>
```

