# Order of Operations

Migrating a large Angular 1 application to Angular >= 2 can be a big undertaking.
We recommend the following order of operations during conversion.

- Webpack
- TypeScript
- Move as much code as possible into pure TypeScript modules
  - Write framework-agnostic unit tests for that code
  - Good candidates for this are stateless services
- Enable ngUpgrade
  - If used, replace the `ng-app` directive with `angular.bootstrap`.
  - Create `UpgradeAdapter` singleton and replace "bootstrap".
- Identify _components_ (directives) of the app most likely to benefit from Angular >= 2
  - These could be parts of the app where performance is a problem,
  parts where there will be more active development or
  parts that could really benefit from Angular >= 2 libraries or components.
- Convert all service dependencies from Angular 1 to Angular >= 2
  - Move existing `.factory` Angular services to `.service`
  - Leverage TypeScript classes
  - Use `upgradeAdapter.downgradeNg2Provider(ServiceName)` to expose Angular >= 2 service to Angular 1
- Repeat this process until all components have been converted to Angular >= 2
