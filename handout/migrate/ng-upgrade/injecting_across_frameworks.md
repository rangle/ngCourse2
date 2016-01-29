# Injecting Across Frameworks

Angular 1.x providers/services can be upgraded and injected into Angular 2

Simple Angular 1.x service:

```js

export class A1UpgradeService {
  data = 'Hello from Angular 1 service';
}
```

Simple Angular 2 component that will have an Angular 1.x service injected into
it:

```js

import {Component, Inject} from  'angular2/core';
import {A1UpgradeService} from '../services/a1-upgrade-service';

@Component({
  selector: 'a2-using-a1-service',
  template: `<p>{{ message }}</p>`
})
export class A2UsingA1Service {
  message = '';
  constructor(@Inject('a1UpgradeService') a1UpgradeService:A1UpgradeService) {
    this.message = a1UpgradeService.data;
  }
}
```

Attaching everything to Angular 1.x:

```js

import {A2UsingA1Service} from './components/a2-using-a1-service';
import {A1UpgradeService} from './services/a1-upgrade-service';

// Angular 1 Vendor Import
import * as angular from 'angular';

// Import the upgradeAdapter singleton
import {upgradeAdapter} from './upgrade-adapter';

// Name the application
const APPNAME = 'angular-upgrade-example';

// Register classic Angular 1 modules
angular
  .module(APPNAME)
  .directive('a2UsingA1Service',
    upgradeAdapter.downgradeNg2Component(A2UsingA1Service))
  .service('a1UpgradeService', A1UpgradeService);

```

Angular 2.x services can be downgraded and injected into Angular 1.  In normal
operation, Angular 2.x services would be bootstrapped with the application, but
because of ng-upgrade being a hybrid mode, this is not the case.  The upgrade
adapter comes with an `addProvider` method that needs to be used in the interim.

Here is a very simple Angular 2 service:

```js

import {Injectable} from 'angular2/core';

@Injectable()
export class A2DowngradeService {
  fetchData() {
    return 'some data';
  }
}
```

Since Angular 2 is bootstrapped with the upgrade adapter, there is no place to
register Angular 2 services.  Fortunately the upgrade adapter's `addProvider`
method can do this:

```js

upgradeAdapter.addProvider(Phones);

```

Lastly, Angular 1.x must be informed about the Angular 2 service:

```js

// The service to downgrade
import {A2DowngradeService} from './services/a2-downgrade'

// Angular 1 Vendor Import
import * as angular from 'angular';

// Import the upgradeAdapter singleton
import {upgradeAdapter} from './upgrade-adapter';

// Name the application
const APPNAME = 'angular-upgrade-example';

// Register classic Angular 1 modules
angular
  .module(APPNAME)
  .factory('a2DowngradeService',
    upgradeAdapter.downgradeNg2Provider(A2DowngradeService));

```

Using this downgraded service in an Angular 1.x directive is as simple as:

```js

import {A2DowngradeService} from '../services/a2-downgrade';

export function a1UsingA2ServiceDirective() {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {},
    controller: A1UsingA2,
    controllerAs: 'a1UsingA2',
    template: `<span>{{ a1UsingA2.message }}</span>`
  };
}

class A1UsingA2 {
  message: string;
  constructor(private a2DowngradeService: A2DowngradeService) {
    this.message = this.a2DowngradeService.fetchData();
  }
}
```

