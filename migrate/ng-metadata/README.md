# Using ng-metadata \(AngularJS Using Angular 2+ Style\)

The ng-metadata approach is done with AngularJS dependencies and a few small helper libraries. ng-metadata allows developers to use Angular style TypeScript \(annotations/decorators\) _without_ Angular. Unfortunately templates are still mostly in AngularJS style.

Once an application is converted to ng-metadata style it is very close to Angular, but still requires refactoring. In most cases, ng-metadata is not as efficient as ng-upgrade with respect to refactoring time. The payload of an ng-metadata application is smaller, and porting to ng-metadata can be done in an even more ad-hoc fashion than with ng-upgrade.

The general flow of using ng-metadata with an application is:

- Install ng-metadata dependencies
- Bootstrap root component
- Upgrade components strategically
- Refactor the codebase to Angular

ng-metadata is favored over the deprecated ng-forward.
