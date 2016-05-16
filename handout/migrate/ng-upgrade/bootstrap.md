# Bootstrap ng-upgrade

- Use manual Angular 1.x bootstrapping, and remove `ng-app`/`ng-strict-di` 
references if they exist
- Add Angular 2 dependencies 
- Add the upgrade adapter `import {UpgradeAdapter} from 'angular2/upgrade'`
- Call the upgrade adapter's bootstrap

Once this is working the foundation is set for transitioning from Angular 1.x to
Angular 2.  It is important to note that the upgrade adapter's bootstrap 
mechanism is asynchronous. Additionally it's important to treat the upgrade
adapter as a singleton.

Bootstrap example:

The following file creates an instance of `UpgradeAdapter`, and exports it.
Angular 2's adapter _must_ be a singleton.

```js

// Angular 2 Vendor Import
import {UpgradeAdapter} from '@angular/upgrade';

// Instantiate an adapter
export const upgradeAdapter = new UpgradeAdapter();

```

The following file bootstraps an Angular 1/2 hybrid application:

```js

// Angular 1 Vendor Import
import * as angular from 'angular';

// Import the upgradeAdapter singleton
import {upgradeAdapter} from './upgrade-adapter';


// Name the application
const APPNAME = 'angular-upgrade-example';

// Register classic Angular 1 modules
angular
  .module(APPNAME, []);

// Bootstrap Angular 1 manually
angular.bootstrap(document.body, [APPNAME]);

// Bootstrap Angular 2 - *note* this is asynchronous
upgradeAdapter.bootstrap(document.documentElement, [APPNAME], {strictDi: true});

```

The above example does not actually do anything other than bootstrap an empty
application. 

## Upgrading/Downgrading Components

Once bootstrapping is complete, Angular 1.x components can be _upgraded_ to
work with Angular 2.  Conversely, Angular 2 components can be _downgraded_ to
work with Angular 1.x


