# Order of Operations

Migrating a large AngularJS application to Angular can be a big undertaking. We recommend the following order of operations during conversion.

- Webpack
- TypeScript
- Move as much code as possible into pure TypeScript modules
  - Write framework-agnostic unit tests for that code
  - Good candidates for this are stateless services
- Enable ngUpgrade
  - If used, replace the `ng-app` directive with `angular.bootstrap`.
  - Ensure App works
  - Install `@angular/upgrade` package
  - Create an Angular `AppModule` that inject the `UpgradeModule` and let it take over the bootstrapping.
- Identify _components_ \(directives\) of the app most likely to benefit from Angular
  - These could be parts of the app where performance is a problem,

    parts where there will be more active development or

    parts that could really benefit from Angular libraries or components.

- Convert all service dependencies from AngularJS to Angular
  - Move existing `.factory` Angular services to `.service`
  - Leverage TypeScript classes
  - Use `downgradeComponent(ServiceName)` to expose Angular service to Angular 1
- Repeat this process until all components have been converted to Angular
