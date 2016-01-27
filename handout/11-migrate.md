<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Part 11: Angular Migrate](#part-11-angular-migrate)
  - [Upgrade to Angular 1.3+ Style](#upgrade-to-angular-13-style)
  - [Use Webpack](#use-webpack)
  - [Migrate to TypeScript](#migrate-to-typescript)
  - [Choose an Upgrade Path](#choose-an-upgrade-path)
    - [Total Conversion](#total-conversion)
    - [ng-forward (Angular 1.x Using 2 Style)](#ng-forward-angular-1x-using-2-style)
    - [ng-upgrade (Angular 1.x Co-Existing With Angular 2)](#ng-upgrade-angular-1x-co-existing-with-angular-2)
      - [Bootstrap ng-upgrade](#bootstrap-ng-upgrade)
      - [Upgrading/Downgrading Components](#upgradingdowngrading-components)
        - [Downgrading](#downgrading)
        - [Upgrading](#upgrading)
      - [Transclusion/Projection](#transclusionprojection)
        - [Projection](#projection)
        - [Transclusion](#transclusion)
      - [Injecting Across Frameworks](#injecting-across-frameworks)
      - [Upgrade Components Strategically](#upgrade-components-strategically)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Part 11: Angular Migrate #

## Upgrade to Angular 1.3+ Style

The first step of any migration is to upgrade the codebases style to conform
to Angular 1.3+ style, ideally an Angular 1.5+ style.  This means:

- All controllers should be in `controllerAs` form, and should ideally only
exist on directives
- Use directives, specifically "component directives", that use the following
properties:
    - `restrict: 'E'`
    - `scope: {}`
    - `bindToController: {}`
    - `controllerAs`
    - `template` or `templateUrl`
    - `transclude` (optional)
    - `require` (optional)
Component directives should _not_ use the following atrtributes:
    - `compile`
    - `replace: true`
    - `priority`/`terminal`
- Ideally have one component, or one _thing_ per file
- Ideally have folders organized by feature


## Use Webpack 

Using a module loader like Webpack is essential for migrating to Angular 2, and
should already be part of every modern developer's tool set.  Webpack will make
it easy to manage all the different files that a modern, modular Angular 1.3+
project prescribes.  This includes bundling the application for distribution or 
deployment.

Using Webpack will also simplify a developer's Angular 2 workflow, since the
easiest way to work with Angular 2 is with TypeScript, or ES6.  Neither of which
works natively in contemporary browsers.


## Migrate to TypeScript

TypeScript is a superset of ES6, and as its name suggests, uses a type system.
This can have an enormous impact on developer tools, providing richer
auto-complete, and static analysis.

Angular 2 was built using TypeScript, and supports decorators which provide meta 
information to Angular.  While it is possible to use Angular 2 without these 
features, the syntax feels more "natural" with TypeScript's decorators.

## Choose an Upgrade Path

There are three primary ways of upgrading from Angular 1, to 2:

- Total Conversion
- ng-upgrade
- ng-forward

### Total Conversion

Completely converting an application from Angular 1 to Angular 2 is technically
possible, but really only suitable for the smallest applications.  Even small
applications can be tricky to totally convert if they're not well structured

### ng-forward (Angular 1.x Using 2 Style)

The ng-forward approach is done with Angular 1.x dependencies, and a few small
helper libraries.  ng-forward allows developers to use Angular 2 style 
TypeScript (annotations/decorators) _without_ Angular 2.  Unfortunately
templates are still mostly in Angular 1.x style.

Once an application is converted to ng-forward style it is very close to Angular
2, but still requires refactoring.  In most cases, ng-forward is not as efficient
an option as ng-upgrade, with respect to refactoring time.  The payload of an
ng-forwarded application is smaller, and porting to ng-forward can be done in an
even more ad-hoc fashion than with ng-upgrade.

The general flow of ng-forwarding an application is:

- Install ng-forward dependencies
- bootstrap root component
- Upgrade components strategically
- Refactor the codebase to Angular 2


### ng-upgrade (Angular 1.x Co-Existing With Angular 2)

The ng-upgrade is done by running Angular 2, and Angular 1 together in the same
application.  In this scenario Angular 1.x controls the page, and Angular 2
controls the change detection mechanisms.  Once the two Angulars co-exist,
upgrading can be done in strategic pieces.

#### Bootstrap ng-upgrade

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
import {UpgradeAdapter} from 'angular2/upgrade';

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

#### Upgrading/Downgrading Components

Once bootstrapping is complete, Angular 1.x components can be _upgraded_ to
work with Angular 2.  Conversely, Angular 2 components can be _downgraded_ to
work with Angular 1.x

##### Downgrading

Upgrading components _sounds_ like it should happen before downgrading, _but_
the point of upgrading is to make an Angular 1.x component work with Angular 2.
For an Angular 2 component to use an Angular 1.x component in an ng-upgrade
application there must first be a downgraded Angular 2 component. Consequently
it's important to first learn how to downgrade Angular 2 components to work with
Angular 1.x

All downgraded components operate like Angular 1.x `'E'` element directives.

Here is an example of a very simple Angular 2 component:

```js

import {Component} from 'angular2/core';

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


##### Upgrading

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

#### Transclusion/Projection

##### Projection

In Angular 2 the concept of "transclusion" has been replaced by the concept of
projection.  ng-upgrade provides mechanisms for projecting/transcluding
Angular 1.x content into Angular 2 components:

This is what a simple Angular 2 component that supports projection looks like:

```js

import {Component, Input} from 'angular2/core';

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

Both the component, and the directive need to be registered with Angular 1.x:

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

##### Transclusion

Angular 2 components can be transcluded into Angular 1.x directives.

Here is a very simple Angular 2 component:

```js

import {Component} from 'angular2/core';

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

#### Injecting Across Frameworks

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

####  Upgrade Components Strategically 

Services that have no dependencies are excellent candidates for conversion. Once
converted to Angular 2, services can be downgraded to work in Angular 1.x.
Components can follow a similar strategy, with 'leaf' components being converted
before 'root' components.

Possibly the most challenging component/service to upgrade is Angular 1.x's UI
Router library.  This process _might_ be simplified in the future, but for
the moment it's best to upgrade _UI_ Router last.  
