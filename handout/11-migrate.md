# Part 11: Angular Migrate #

## Upgrade to Angular 1.3+ Style

The first step of any migration is to upgrade the codebase's style to conform
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
project prescribes.  This includes, bundling the application for distribution,
or deployment.

Using Webpack will also simplify a developer's Angular 2 workflow, since the
easiest way to work with Angular 2 is with TypeScript, or ES6.  Neither of which
works natively in contemporary browsers.


## Migrate to TypeScript

TypeScript is a superset of ES6, and as its name suggests, uses a type system.
This can have an enormous impact on developer tools, providing richer
auto-complete, and static analysis.

Angular 2 was built using TypeScript, and supports decorators/annotations which
provide meta information to Angular.  While it is possible to use Angular 2
without these features, the syntax feels more "natural" with TypeScript's
decorators.

## Choose an Upgrade Path

There are three primary ways of upgrading form Angular 1, to 2:

- Total Conversion
- ng-upgrade
- ng-forward

### Total Conversion

Completely converting an application from Angular 1 to Angular 2 is technically
possible, but really only suitable for the smallest applications.  Even small
applications can be tricky to totally convert if they're not well formatted

### ng-forward (Angular 1.x Using 2 Style)

The ng-forward approach is done with Angular 1.x dependencies, and a few small
helper libraries.  ng-forward allows developers to use Angular 2 style 
TypeScript (annotations/decorators) _without_ Angular 2.  Unfortunately
templates are still mostly in Angular 1.x style.

Once an application is converted to ng-forward style it is very close to Angular
2, but still requires refactoring.  In most cases ng-forward is not as efficient
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

#### Upgrading/Downgrading Components

Once bootstrapping is complete, Angular 1.x components can be _upgraded_ to
work with Angular2.  Conversely, Angular 2 components can be _downgraded_ to
work with Angular 1.x

##### Downgrading

All downgraded components operate like Angular 1.x `'E'` element directives.

@todo downgrade example

##### Upgrading

The only Angular 1.x components that can be upgraded, and used in Angular 2 code
are those that _strictly_ follow the component pattern outlined at the top of
this document. Wherever possible use Angular 1.5+'s `.component`

@todo upgrade example

#### Transclustion/Projection

@todo transclustion example

#### Injecting Across Frameworks

Angular 1.x providers/services can be upgraded, and injected into Angular 2

@todo Angular 1 upgrade service example

Angular 2.x services can be downgraded, and injected into Angular 1.  In normal
operation, Angular 2.x services would be bootstrapped with the application, but
because of ng-upgrade being a hybrid mode, this is not the case.  The upgrade
adapter comes with an `addProvider` method that needs to be used in the interim.

@todo Angular 2 downgrade example

####  Upgrade components strategically 

Services that have no dependencies are excellent candidates for conversion. Once
converted to Angular 2, services can be downgraded to work in Angular 1.x.
Components can follow a similar strategy, with 'leaf' components being converted
before 'root' components.

Possibly the most challenging component/service to upgrade is Angular 1.x's UI
Router library.  This process _might_ be simplified in the future, but for
the moment it's best to upgrade _UI_ Router last.  
