# Using ng-forward (Angular 1.x Using 2 Style)

The ng-forward approach is done with Angular 1.x dependencies and a few small
helper libraries.  ng-forward allows developers to use Angular 2 style 
TypeScript (annotations/decorators) _without_ Angular 2.  Unfortunately
templates are still mostly in Angular 1.x style.

Once an application is converted to ng-forward style it is very close to Angular
2, but still requires refactoring.  In most cases, ng-forward is not as efficient
as ng-upgrade with respect to refactoring time.  The payload of an
ng-forwarded application is smaller, and porting to ng-forward can be done in an
even more ad-hoc fashion than with ng-upgrade.

The general flow of ng-forwarding an application is:

- install ng-forward dependencies
- bootstrap root component
- upgrade components strategically
- refactor the codebase to Angular 2
