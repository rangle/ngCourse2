# Downgrading Components

Upgrading components sounds like it should happen before downgrading, but
the point of upgrading is to make an Angular 1.x component work with Angular 2.
For an Angular 2 component to use an Angular 1.x component in an ng-upgrade
application there must first be a downgraded Angular 2 component. Consequently
it's important to first learn how to downgrade Angular 2 components to work with
Angular 1.x

All downgraded components operate like Angular 1.x `'E'` element directives.

Here is an example of a very simple Angular 2 component:

```js
import {Component} from '@angular/core';

@Component({
  selector: 'a2-downgrade',
  template: '<p>{{ message }}</p>'
})
export class A2DowngradeComponent {
  message = `What you're seeing here is an Angular2 component ` +
    `running in an Angular1 app!`;
}
```

Registering the downgraded component with Angular 1.x:

```js
// Angular 1 Vendor Import
import * as angular from 'angular';

// Angular 2 component from above
import {A2DowngradeComponent} from './components/a2-downgrade';

// Register classic Angular 1 modules
angular
  .module(APPNAME)
  .directive('a2Downgrade', 
    upgradeAdapter.downgradeNg2Component(A2DowngradeComponent));
  
```
