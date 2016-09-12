# Controlling Access to or from a Route #

To control whether the user can navigate to or away from a given route, use route guards.

For example, we may want some routes to only be accessible once the user has logged in or accepted Terms & Conditions. We can use route guards to check these conditions and control access to routes.

Route guards can also control whether a user can leave a certain route. For example, say the user has typed information into a form on the page, but has not submitted the form. If they were to leave the page, they would lose the information. We may want to prompt the user if the user attempts to leave the route without submitting or saving the information.

## Registering the Route Guards with Routes ##

In order to use route guards, we must register them with the specific routes we want them to run for.

For example, say we have an `accounts` route that only users that are logged in can navigate to. This page also has forms and we want to make sure the user has submitted unsaved changes before leaving the accounts page.

In our route config we can add our guards to that route:

```javascript
import { Routes, RouterModule } from '@angular/router';
import { AccountPage } from './account-page';
import { LoginRouteGuard } from './login-route-guard';
import { SaveFormsGuard } from './save-forms-guard';

const routes: Routes = [
  { path: 'home', component: HomePage },
  {
    path: 'accounts',
    component: AccountPage,
    canActivate: [LoginRouteGuard],
    canDeactivate: [SaveFormsGuard]
  }
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes);
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

`canActivate` can also be used to notify the user that they can't access that part of the application, or redirect them to the login page.

[See Official Definition for CanActivate](https://angular.io/docs/ts/latest/api/router/index/CanActivate-interface.html)

## Implementing CanDeactivate ##

`CanDeactivate` works in a similar way to `CanActivate` but there are some important differences. The `canDeactivate` function passes the component being deactivated as an argument to the function:

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
import { AccountPage } from './account-page';

@Injectable()
export class SaveFormsGuard implements CanDeactivate<AccountPage> {

  canDeactivate(component: AccountPage) {
    return component.areFormsSaved();
  }

}
```

[See Official Definition for CanDeactivate](https://angular.io/docs/ts/latest/api/router/index/CanDeactivate-interface.html)

## Async Route Guards ##

The `canActivate` and `canDeactivate` functions can either return values of type `boolean`, or `Observable<boolean>` (an Observable that resolves to `boolean`). If you need to do an asynchronous request (like a server request) to determine whether the user can navigate to or away from the route, you can simply return an `Observable<boolean>`. The router will wait until it is resolved and use that value to determine access.

For example, when the user navigates away you could have a dialog service ask the user to confirm the navigation. The dialog service returns an `Observable<boolean>` which resolves to true if the user clicks 'OK', or false if user clicks 'Cancel'.

```javascript
  canDeactivate() {
    return dialogService.confirm('Discard unsaved changes?');
  }
```


[View Example](http://plnkr.co/edit/NCb0QjpKkIlCvZ00y0VO?p=preview)

[See Official Documentation for Route Guards](https://angular.io/docs/ts/latest/guide/router.html#!#guards)
