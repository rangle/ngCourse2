# Upgrading Components

The only AngularJS 1.x components that can be upgraded and used in Angular code are those that _strictly_ follow the component pattern outlined at the top of this document. Wherever possible use AngularJS 1.5+'s `.component`.

Here is an AngularJS 1.x directive that conforms to ng-upgrade's "component directive" specification:

```javascript
angular
  .module("app")
  .directive("a1Upgradable", function a1UpgradableDirective() {
    return {
      restrict: "E",
      scope: {},
      bindToController: {},
      controller: Upgradable,
      controllerAs: "a1Upgradable",
      template: `<span>{{ a1Upgradable.message }}</span>`,
    };
  });

class Upgradable {
  message = "I am an Angular 1 Directive";
}
```

Equivalently this can be written using `.component` in AngularJS 1.5+:

```javascript
angular.module("app").component("a1Upgradable", {
  controller: Upgradable,
  template: `<span>{{ a1Upgradable.message }}</span>`,
});

class Upgradable {
  message = "I am an AngularJS Directive";
}
```

Below is an Angular component that will use the upgraded AngularJS directive:

```javascript
import { upgradeAdapter } from "../upgrade-adapter";
import { A2UsingA1Component } from "./a2-using-a1.component";

@NgModule({
  declarations: [
    upgradeAdapter.upgradeNg1Component("a1Upgradable"),
    A2UsingA1Component,
  ],
  providers: [],
  imports: [BrowserModule],
})
export class AppModule {}
```

```javascript
import { Component } from "@angular/core";

@Component({
  selector: "a2-using-a1",
  template: `<p>{{ message }}<a1-upgradable></a1-upgradable></p>`,
})
export class A2UsingA1Component {
  message = "Angular Using AngularJS: ";
}
```

Finally, let AngularJS know about the directive:

```javascript
import { a1UpgradableDirective } from "./components/a1-upgradable";

// Angular 1 Vendor Import
import * as angular from "angular";

// Register classic AngularJS modules
angular.module(APPNAME).directive("a1Upgradable", a1UpgradableDirective);
```
