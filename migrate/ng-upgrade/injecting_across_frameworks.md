# Injecting Across Frameworks

AngularJS providers/services can be upgraded and injected into Angular.

Simple AngularJS service:

```javascript
export class A1UpgradeService {
  data = "Hello from AngularJS service";
}
```

Simple Angular component that will have an AngularJS service injected into it:

```javascript
import { Component, Inject } from "@angular/core";
import { A1UpgradeService } from "../services/a1-upgrade-service";

@Component({
  selector: "a2-using-a1-service",
  template: `<p>{{ message }}</p>`,
})
export class A2UsingA1Service {
  message = "";
  constructor(@Inject("a1UpgradeService") a1UpgradeService: A1UpgradeService) {
    this.message = a1UpgradeService.data;
  }
}
```

Attaching everything to AngularJS:

```javascript
import { A2UsingA1Service } from "./components/a2-using-a1-service";
import { A1UpgradeService } from "./services/a1-upgrade-service";

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
    "a2UsingA1Service",
    upgradeAdapter.downgradeNg2Component(A2UsingA1Service)
  )
  .service("a1UpgradeService", A1UpgradeService);
```

Angular services can be downgraded and injected into AngularJS. In normal operation, Angular services would be bootstrapped with the application, but because of ng-upgrade being a hybrid mode, this is not the case. The upgrade adapter comes with an `addProvider` method that must be used in the interim.

Here is a very simple Angular service:

```javascript
import { Injectable } from "@angular/core";

@Injectable()
export class A2DowngradeService {
  fetchData() {
    return "some data";
  }
}
```

Since Angular is bootstrapped with the upgrade adapter, there is no place to register Angular services. Fortunately the upgrade adapter's `addProvider` method can do this:

```javascript
upgradeAdapter.addProvider(Phones);
```

Lastly, AngularJS must be informed about the Angular service:

```javascript
// The service to downgrade
import { A2DowngradeService } from "./services/a2-downgrade";

// AngularJS Vendor Import
import * as angular from "angular";

// Import the upgradeAdapter singleton
import { upgradeAdapter } from "./upgrade-adapter";

// Name the application
const APPNAME = "angular-upgrade-example";

// Register classic AngularJS modules
angular
  .module(APPNAME)
  .factory(
    "a2DowngradeService",
    upgradeAdapter.downgradeNg2Provider(A2DowngradeService)
  );
```

Using this downgraded service in an AngularJS directive is as simple as:

```javascript
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
