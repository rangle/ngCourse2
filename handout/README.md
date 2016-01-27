<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [The Handout](#the-handout)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# The Handout

This folder contains the handout for the course, broken down into one Markdown file for each part of the course. You can access each part via Github, by
clicking on the file. Alternatively, you can generate a single HTML file by doing the following:

```bash
  cd handout
  npm install
  node build.js > handout.html
```

Please note that the handout is not meant to be used as a stand-alone text. In the course of the training the instructor will provide further explanation.
The main purpose of the handout is to help the students follow the course and to be able to revisit the material later.

<!-- START GENERATED TOC -->


- [Part 0: Introduction to Angular2 and ngCourse2](00-introduction.md#part-0-introduction-to-angular2-and-ngcourse2)
  - [Angular 2's Advantages](00-introduction.md#angular-2s-advantages)
    - [Angular 2 is Easier](00-introduction.md#angular-2-is-easier)
    - [Performance, and Mobile](00-introduction.md#performance-and-mobile)
    - [Project Architecture, and Maintenance](00-introduction.md#project-architecture-and-maintenance)
    - [Features](00-introduction.md#features)
  - [Differences between Angular Versions](00-introduction.md#differences-between-angular-versions)


- [Part 1: EcmaScript 6 and TypeScript Features](01-features.md#part-1-ecmascript-6-and-typescript-features)
  - [ES6](01-features.md#es6)
    - [Template Strings](01-features.md#template-strings)
    - [Classes](01-features.md#classes)
    - [A Refresher on `this`](01-features.md#a-refresher-on-this)
    - [Arrow Functions](01-features.md#arrow-functions)
    - [Inheritance](01-features.md#inheritance)
    - [Constants, and Block Scoped Variables](01-features.md#constants-and-block-scoped-variables)
    - [...spread, and ...rest](01-features.md#spread-and-rest)
    - [Destructuring](01-features.md#destructuring)
  - [ES6 Modules](01-features.md#es6-modules)
  - [Additional ES6 Features](01-features.md#additional-es6-features)
  - [TypeScript](01-features.md#typescript)
    - [Getting Started With TypeScript](01-features.md#getting-started-with-typescript)
      - [Note About ES6 Examples](01-features.md#note-about-es6-examples)
      - [Working With `tsc`](01-features.md#working-with-tsc)
      - [Target](01-features.md#target)
      - [Module](01-features.md#module)
      - [Decorators](01-features.md#decorators)
      - [TypeScript with Webpack](01-features.md#typescript-with-webpack)
      - [Typings](01-features.md#typings)
      - [Linting](01-features.md#linting)
    - [Typescript Features](01-features.md#typescript-features)
      - [Types, Interfaces, and "Shapes"](01-features.md#types-interfaces-and-shapes)
        - [TypeScript classes](01-features.md#typescript-classes)
        - [Interfaces](01-features.md#interfaces)
        - [Shapes](01-features.md#shapes)
      - [Type Inference](01-features.md#type-inference)
      - [Decorators](01-features.md#decorators-1)
        - [Property Decorators](01-features.md#property-decorators)
        - [Class Decorators](01-features.md#class-decorators)
        - [Parameter Decorators](01-features.md#parameter-decorators)


- [Part 2: The JavaScript Toolchain](02-tooling.md#part-2-the-javascript-toolchain)
  - [Source Control: [Git](http://git-scm.com/)](02-tooling.md#source-control-githttpgit-scmcom)
  - [The Command Line](02-tooling.md#the-command-line)
  - [Command-line JavaScript: [Node.JS](http://nodejs.org)](02-tooling.md#command-line-javascript-nodejshttpnodejsorg)
  - [Back-End Code Sharing and Distribution: [npm](https://www.npmjs.com/)](02-tooling.md#back-end-code-sharing-and-distribution-npmhttpswwwnpmjscom)
  - [Module Loading, Bundling and Build Tasks: [Webpack](http://webpack.github.io/docs/what-is-webpack.html)](02-tooling.md#module-loading-bundling-and-build-tasks-webpackhttpwebpackgithubiodocswhat-is-webpackhtml)
  - [Chrome](02-tooling.md#chrome)
  - [Getting the Code](02-tooling.md#getting-the-code)


- [Part 3: Components in Angular 2](03-components.md#part-3-components-in-angular-2)
  - [Creating Components](03-components.md#creating-components)
  - [Application Structure with Components](03-components.md#application-structure-with-components)
    - [Passing Data into a Component](03-components.md#passing-data-into-a-component)
    - [Responding to Component Events](03-components.md#responding-to-component-events)
    - [Two-Way Data Binding](03-components.md#two-way-data-binding)
  - [Structural Directives](03-components.md#structural-directives)
      - [The Asterisk (*) Syntax](03-components.md#the-asterisk--syntax)
      - [Iteration with `ngFor`](03-components.md#iteration-with-ngfor)
  - [Projection](03-components.md#projection)
      - [Child Component](03-components.md#child-component)
  - [Structuring Applications with Components](03-components.md#structuring-applications-with-components)


- [Part 4: Observables](04-observables.md#part-4-observables)
  - [Using Observables](04-observables.md#using-observables)
  - [Error Handling](04-observables.md#error-handling)
  - [Disposing Subscriptions and Releasing Resources](04-observables.md#disposing-subscriptions-and-releasing-resources)
  - [Observables vs. Promises](04-observables.md#observables-vs-promises)
  - [Using Observables From Other Sources](04-observables.md#using-observables-from-other-sources)
    - [Observable Form Events](04-observables.md#observable-form-events)
    - [Observable HTTP Events](04-observables.md#observable-http-events)
  - [Observables Array Operations](04-observables.md#observables-array-operations)
  - [Combining Streams with `flatMap`](04-observables.md#combining-streams-with-flatmap)
  - [Cold vs. Hot Observables](04-observables.md#cold-vs-hot-observables)
    - [Converting from Cold Observables to Hot Observables](04-observables.md#converting-from-cold-observables-to-hot-observables)
  - [Summary](04-observables.md#summary)


- [Part 5: Angular 2 Dependency Injection](05-di.md#part-5-angular-2-dependency-injection)
  - [What is DI?](05-di.md#what-is-di)
  - [DI Framework](05-di.md#di-framework)
  - [Angular 2's DI](05-di.md#angular-2s-di)
    - [`@Inject` and `@Injectable`](05-di.md#@inject-and-@injectable)
  - [Injection, Beyond Classes](05-di.md#injection-beyond-classes)
  - [The Injector Tree](05-di.md#the-injector-tree)


- [Immutable.js](05.1-immutablejs.md#immutablejs)
  - [What is immutability?](05.1-immutablejs.md#what-is-immutability)
  - [The case for Immutability](05.1-immutablejs.md#the-case-for-immutability)
  - [JavaScript solutions](05.1-immutablejs.md#javascript-solutions)
    - [Object.assign](05.1-immutablejs.md#objectassign)
    - [Object.freeze](05.1-immutablejs.md#objectfreeze)
  - [Immutable.js basics](05.1-immutablejs.md#immutablejs-basics)
    - [Immutable.Map](05.1-immutablejs.md#immutablemap)
      - [Map.merge](05.1-immutablejs.md#mapmerge)
      - [Maps are iterable](05.1-immutablejs.md#maps-are-iterable)
    - [Immutable.List](05.1-immutablejs.md#immutablelist)
    - [Official documentation](05.1-immutablejs.md#official-documentation)


- [Part 6: Change Detection](06-change-detection.md#part-6-change-detection)
  - [Change Detection Strategies in Angular 1 vs Angular 2](06-change-detection.md#change-detection-strategies-in-angular-1-vs-angular-2)
  - [How Change Detection Works](06-change-detection.md#how-change-detection-works)
- [MovieApp](06-change-detection.md#movieapp)
    - [{{ title }}](06-change-detection.md#-title-)
  - [Change Detector Classes](06-change-detection.md#change-detector-classes)
  - [Change Detection Strategy: Default](06-change-detection.md#change-detection-strategy-default)
  - [Performance Impact](06-change-detection.md#performance-impact)
  - [Change Detection Strategy: OnPush](06-change-detection.md#change-detection-strategy-onpush)
  - [Enforcing Immutability](06-change-detection.md#enforcing-immutability)
- [MovieApp](06-change-detection.md#movieapp-1)
    - [{{ title }}](06-change-detection.md#-title--1)
  - [Additional Resources](06-change-detection.md#additional-resources)


- [Part 7: Pipes](07-pipes.md#part-7-pipes)
  - [Using Pipes](07-pipes.md#using-pipes)
  - [Passing Parameters](07-pipes.md#passing-parameters)
  - [Chaining Pipes](07-pipes.md#chaining-pipes)
  - [Custom Pipes](07-pipes.md#custom-pipes)
  - [Stateful Pipes](07-pipes.md#stateful-pipes)
  - [Async Pipe](07-pipes.md#async-pipe)
  - [Implementing Stateful Pipes](07-pipes.md#implementing-stateful-pipes)


- [Part 8: Forms](08-form-builder.md#part-8-forms)
  - [Creating a Form with Directives](08-form-builder.md#creating-a-form-with-directives)
  - [Getting the Form's Values](08-form-builder.md#getting-the-forms-values)
  - [Control Grouping](08-form-builder.md#control-grouping)
  - [Validation](08-form-builder.md#validation)
  - [Visual Cues with CSS](08-form-builder.md#visual-cues-with-css)
  - [Creating a Form with the "FormBuilder"](08-form-builder.md#creating-a-form-with-the-formbuilder)
  - [Built-in Validators](08-form-builder.md#built-in-validators)
  - [Custom Validators](08-form-builder.md#custom-validators)
  - [Async Validators](08-form-builder.md#async-validators)
  - [Observing Changes](08-form-builder.md#observing-changes)
  - [Models](08-form-builder.md#models)
  - [Alternative Syntax](08-form-builder.md#alternative-syntax)


- [Part 9: Routing](09-routing.md#part-9-routing)
  - [Why Routing?](09-routing.md#why-routing)
  - [Routing in Angular 2](09-routing.md#routing-in-angular-2)
  - [RouteConfig](09-routing.md#routeconfig)
    - [Route Definition Object](09-routing.md#route-definition-object)
  - [RouterOutlet](09-routing.md#routeroutlet)
  - [RouterLink](09-routing.md#routerlink)
  - [Using the Router Programmatically](09-routing.md#using-the-router-programmatically)
  - [Creating Child Routes](09-routing.md#creating-child-routes)
  - [Using Routing with LocationStrategy](09-routing.md#using-routing-with-locationstrategy)
  - [Using Auxiliary Routes](09-routing.md#using-auxiliary-routes)
    - [Default Route Outlet](09-routing.md#default-route-outlet)
    - [Test Aux 1](09-routing.md#test-aux-1)
  - [Lazy Loading of Components](09-routing.md#lazy-loading-of-components)
  - [RouteParams](09-routing.md#routeparams)
  - [RouteData](09-routing.md#routedata)


  - [Part 10: Angular 2 and Redux](10-redux.md#part-10-angular-2-and-redux)
  - [What is Redux](10-redux.md#what-is-redux)
    - [Resources](10-redux.md#resources)
  - [Quick Review of Reducers and Pure Functions](10-redux.md#quick-review-of-reducers-and-pure-functions)
  - [Redux Reducers](10-redux.md#redux-reducers)
  - [Simple Reducer](10-redux.md#simple-reducer)
  - [Redux Actions](10-redux.md#redux-actions)
    - [Synchronous Actions](10-redux.md#synchronous-actions)
    - [Asynchronous Actions](10-redux.md#asynchronous-actions)
  - [Configuring your Application to use Redux](10-redux.md#configuring-your-application-to-use-redux)
    - [Create our application reducer](10-redux.md#create-our-application-reducer)
    - [Create and configure a store](10-redux.md#create-and-configure-a-store)
    - [Register the provider with Angular 2](10-redux.md#register-the-provider-with-angular-2)
  - [Using Redux with Components](10-redux.md#using-redux-with-components)
  - [Counter Example](10-redux.md#counter-example)
  - [Redux and Component Architecture](10-redux.md#redux-and-component-architecture)
- [Simple Redux](10-redux.md#simple-redux)
  - [Click Counter](10-redux.md#click-counter)
  - [Curse Counter](10-redux.md#curse-counter)
- [Redux: Dumb Counter](10-redux.md#redux-dumb-counter)
  - [Click Counter](10-redux.md#click-counter-1)
  - [Curse Counter](10-redux.md#curse-counter-1)
  - [Curse Counter](10-redux.md#curse-counter-2)
- [Redux: Dumb Counter](10-redux.md#redux-dumb-counter-1)


- [Part 11: Angular Migrate](11-migrate.md#part-11-angular-migrate)
  - [Upgrade to Angular 1.3+ Style](11-migrate.md#upgrade-to-angular-13-style)
  - [Use Webpack](11-migrate.md#use-webpack)
  - [Migrate to TypeScript](11-migrate.md#migrate-to-typescript)
  - [Choose an Upgrade Path](11-migrate.md#choose-an-upgrade-path)
    - [Total Conversion](11-migrate.md#total-conversion)
    - [ng-forward (Angular 1.x Using 2 Style)](11-migrate.md#ng-forward-angular-1x-using-2-style)
    - [ng-upgrade (Angular 1.x Co-Existing With Angular 2)](11-migrate.md#ng-upgrade-angular-1x-co-existing-with-angular-2)
      - [Bootstrap ng-upgrade](11-migrate.md#bootstrap-ng-upgrade)
      - [Upgrading/Downgrading Components](11-migrate.md#upgradingdowngrading-components)
        - [Downgrading](11-migrate.md#downgrading)
        - [Upgrading](11-migrate.md#upgrading)
      - [Transclusion/Projection](11-migrate.md#transclusionprojection)
        - [Projection](11-migrate.md#projection)
        - [Transclusion](11-migrate.md#transclusion)
      - [Injecting Across Frameworks](11-migrate.md#injecting-across-frameworks)
      - [Upgrade Components Strategically](11-migrate.md#upgrade-components-strategically)


- [Part 12: Angular Universal](12-universal.md#part-12-angular-universal)
    - [Setting up the Server](12-universal.md#setting-up-the-server)
    - [Universal Components](12-universal.md#universal-components)
    - [Capturing Events Using Preboot](12-universal.md#capturing-events-using-preboot)


- [Part 13: Project Setup](13-setup.md#part-13-project-setup)
  - [Angular CLI](13-setup.md#angular-cli)


- [Part 14: Advanced Components](14-advanced-components.md#part-14-advanced-components)
  - [Component Lifecycle](14-advanced-components.md#component-lifecycle)
  - [Accessing Other Component](14-advanced-components.md#accessing-other-component)
  - [View Encapsulation](14-advanced-components.md#view-encapsulation)
  - [ElementRef](14-advanced-components.md#elementref)


- [Bootstrapping an Angular 2 Application](15-bootstrapping.md#bootstrapping-an-angular-2-application)
  - [File structure](15-bootstrapping.md#file-structure)
  - [Bootstrapping Providers](15-bootstrapping.md#bootstrapping-providers)
    - [Using Router Providers](15-bootstrapping.md#using-router-providers)


- [The Handout](README.md#the-handout)


- [t](t.md#t)

<!-- END GENERATED TOC -->