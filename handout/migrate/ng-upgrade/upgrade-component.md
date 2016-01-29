# Upgrading

The only Angular 1.x components that can be upgraded, and used in Angular 2 code
are those that _strictly_ follow the component pattern outlined at the top of
this document. Wherever possible use Angular 1.5+'s `.component`

Here is an Angular 1.x directive that conforms to ng-upgrade's "component 
directive" specification: 

```js

export function a1UpgradableDirective() {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {},
    controller: Upgradable,
    controllerAs: 'a1Upgradable',
    template: `<span>{{ a1Upgradable.message }}</span>`
  };
}

class Upgradable {
  message = 'I am an Angular 1 Directive';
}
```

Here is an Angular 2 component that will _use_ the upgraded Angular 1.x
directive:

```js

import {Component} from 'angular2/core';
import {upgradeAdapter} from '../upgrade-adapter';


@Component({
  selector: 'a2-using-a1',
  directives: [upgradeAdapter.upgradeNg1Component('a1Upgradable')],
  template: `<p>{{ message }}<a1-upgradable></a1-upgradable></p>`
})
export class A2UsingA1Component {
  message = 'Angular 2 Using Angular 1: ';
}
```

Finally, let Angular 1.x know about the directive:

```js

import {a1UpgradableDirective} from './components/a1-upgradable';

// Angular 1 Vendor Import
import * as angular from 'angular';

// Register classic Angular 1 modules
angular
  .module(APPNAME)
  .directive('a1Upgradable', a1UpgradableDirective)

```

