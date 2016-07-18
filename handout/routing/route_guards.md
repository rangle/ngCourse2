# Route Guards #

Route guards provide a way to control whether the user can navigate to or navigate away from a given route.

For example, we may want some routes to only be accessible once the user has logged in or accepted Terms & Conditions. We can use route guards to check these conditions and control access to routes.

Route guards can also control whether a user can leave a certain route. For example, say the user has typed information into a form on the page, but has not submitted the form. If they were to leave the page, they would lose the information. We may want to prompt the user if the user attempts to leave the route without submitting or saving the information.

## Registering the Route Guards with Routes ##

In order to use route guards, we must register them with the specific routes we want them to run for.

For example, say we have an `accounts` route that only users that are logged in can navigate to. This page also has forms and we want to make sure the user has submitted unsaved changes before leaving the accounts page.

In our route config we can add our guards to that route:

```javascript
import { LoginRouteGuard } from './login-route-guard';
import { SaveFormsGuard } from './save-forms-guard';

import { provideRouter, RouterConfig } from '@angular/router';
import { HomePage } from './home-page';
import { AccountPage } from './account-page';

const routes: RouterConfig = [
  { path: 'home', component: HomePage },
  {
    path: 'accounts',
    component: AccountPage,
    canActivate: [LoginRouteGuard],
    canDeactivate: [SaveFormsGuard]
  }
];

bootstrap(AppComponent, [
  provideRouter(routes),
  LoginRouteGuard,
  SaveFormsGuard
]);
```

Now `LoginRouteGuard` will be checked by the router when activating the `accounts` route, and `SaveFormsGuard` will be checked when leaving that route.

## Implementing CanActivate ##

Let's look at an example activate guard that checks whether the user is logged in:

```javascript
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './login-service';

@Injectable()
export class LoginRouteGuard implements CanActivate {

  constructor(private loginService: LoginService) {}

  canActivate() {
    return this.loginService.isLoggedIn();
  }
}
```

This class implements the `CanActivate` interface by implementing the `canActivate` function.

When `canActivate` returns true, the user can activate the route. When `canActivate` returns false, the user cannot access the route. In the above example, we allow access when the user is logged in.

We can do other things in the `canActivate` function as well such as notify the user that they can't access that part of the application, or redirect them to the login page.

[See Official Definition for CanActivate](https://angular.io/docs/ts/latest/api/router/index/CanActivate-interface.html)

## Implementing CanDeactivate ##

`CanDeactivate` works in a similar way to `CanActivate`, however there are some important differences. The `canDeactivate` function passes the component being deactivated as an argument to the function:

```javascript
export interface CanDeactivate<T> {
  canDeactivate(component: T, route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
      Observable<boolean>|Promise<boolean>|boolean;
}
```

We can use that component to determine whether the user can deactivate.

```javascript
import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import AccountPage from './account-page';

@Injectable()
export class SaveFormsGuard implements CanDeactivate<AccountPage> {

  canDeactivate(component: AccountPage) {
    return component.areFormsSaved();
  }

}
```

[See Official Definition for CanDeactivate](https://angular.io/docs/ts/latest/api/router/index/CanDeactivate-interface.html)

## Async Route Guards ##

The `canActivate` and `canDeactivate` functions can either return values of type `boolean`, or `Observable<boolean>` (an Observable that resolve to `boolean`). If you need to do an asynchronous request (like a server request) to determine whether the user can navigate to or away from the route, you can simply return an `Observable<boolean>`. The router will wait until it is resolved and use that value to determine access.

For example, when the user navigates away we could have a dialog service ask the user to confirm the navigation. The dialog service returns an `Observable<boolean>` which resolves to true if the user has clicked 'OK', false if user clicks 'Cancel'.

```javascript
  canDeactivate() {
    return dialogService.confirm('Discard unsaved changes?');
  }
```


[View Example](http://plnkr.co/edit/Y5i1bE6ENkrMxWQg7Y1z?p=preview)

[See Official Documentation for Route Guards](https://angular.io/docs/ts/latest/guide/router.html#!#guards)