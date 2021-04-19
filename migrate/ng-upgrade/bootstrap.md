# Bootstrapping ng-upgrade

- Use manual AngularJS bootstrapping, and remove `ng-app`/`ng-strict-di`

  references if they exist

- Add Angular dependencies
- Add the upgrade adapter `import {UpgradeAdapter} from '@angular/upgrade'`
- Call the upgrade adapter's bootstrap

Once this is working the foundation is set for transitioning from AngularJS to Angular. It is important to note that the upgrade adapter's bootstrap mechanism is asynchronous. Additionally it's important to treat the upgrade adapter as a singleton.

The following file creates an instance of `UpgradeAdapter` and exports it.

```javascript
// Angular Vendor Import
import { UpgradeAdapter } from "@angular/upgrade";
import { NgModule, forwardRef } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

// Instantiate an adapter with the AppModule
// Use forwardRef to pass AppModule reference at runtime
export const upgradeAdapter = new UpgradeAdapter(forwardRef(() => AppModule));

@NgModule({
  declarations: [],
  providers: [],
  imports: [BrowserModule],
})
export class AppModule {}
```

The following file bootstraps an AngularJS/Angular hybrid application:

```javascript
// Import the upgradeAdapter singleton
import { upgradeAdapter } from "./upgrade-adapter";

// Name the application
const APPNAME = "angular-upgrade-example";

// Register classic AngularJS modules
angular.module(APPNAME, []);

// Bootstrap Angular - *note* this is asynchronous
upgradeAdapter.bootstrap(document.body, [APPNAME], { strictDi: true });
```

The above example does not actually do anything other than bootstrap an empty application.

## Upgrading/Downgrading Components

Once bootstrapping is complete, AngularJS components can be _upgraded_ to work with Angular. Conversely, Angular components can be _downgraded_ to work with AngularJS.
