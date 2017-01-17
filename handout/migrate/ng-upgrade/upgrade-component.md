# Upgrading Components

The only Angular 1.x components that can be upgraded and used in Angular 2 code
are those that _strictly_ follow the component pattern outlined at the top of
this document. Wherever possible use Angular 1.5+'s `.component`.

Here is an Angular 1.x directive that conforms to ng-upgrade's "component
directive" specification:

```js
angular.module('app').directive('a1Upgradable', function a1UpgradableDirective() {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {},
    controller: Upgradable,
    controllerAs: 'a1Upgradable',
    template: `<span>{{ a1Upgradable.message }}</span>`
  };
});

class Upgradable {
  message = 'I am an Angular 1 Directive';
}
```

Equivalently this can be written using `.component` in Angular 1.5+:

```js
angular.module('app').component('a1Upgradable', {
  controller: Upgradable,
  template: `<span>{{ a1Upgradable.message }}</span>`
});

class Upgradable {
  message = 'I am an Angular 1 Directive';
}
```

Below is an Angular 2 component that will use the upgraded Angular 1.x
directive:

```js
import {upgradeAdapter} from '../upgrade-adapter';
import {A2UsingA1Component} from './a2-using-a1.component';

@NgModule({
  declarations: [upgradeAdapter.upgradeNg1Component('a1Upgradable'), A2UsingA1Component],
  providers: [],
  imports: [BrowserModule]
})
export class AppModule {
}```

```js
import {Component} from '@angular/core';

@Component({
  selector: 'a2-using-a1',
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
