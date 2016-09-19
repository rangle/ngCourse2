# Lazy Loading a Module

Another advantage of using modules to group related pieces of functionality of our application is the ability to load those pieces on demand. Lazy loading modules helps us decrease the startup time. With lazy loading our application does not need to load everything at once, it only needs to load what the user expects to see when the app first loads. Modules that are lazily loaded will only be loaded when the user navigates to their routes.

To show this relationship, let's start by defining a simple module that will act as the root module of our example application.

_app/app.module.ts_

```js
import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EagerComponent } from './eager.component';
import { routing } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    routing
  ],
  declarations: [
    AppComponent,
    EagerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

So far this is a very common module that relies on the `BrowserModule`, has a `routing` mechanism and two components: `AppComponent` and `EagerComponent`. For now, let's focus on the root component of our application (`AppComponent`) where the navigation is defined.

_app/app.component.ts_

```js
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>My App</h1>
    <nav>
      <a routerLink="eager">Eager</a>
      <a routerLink="lazy">Lazy</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
```

Our navigation system has only two paths: `eager` and `lazy`. To know what those paths are loading when clicking on them we need to take a look at the `routing` object that we passed to the root module.

_app/app.routing.ts_

```js
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EagerComponent } from './eager.component';

const routes: Routes = [
  { path: '', redirectTo: 'eager', pathMatch: 'full' },
  { path: 'eager', component: EagerComponent },
  { path: 'lazy', loadChildren: 'lazy/lazy.module#LazyModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
```

Here we can see that the default path in our application is called `eager` which will load `EagerComponent`.

_app/eager.component.ts_

```js
import { Component } from '@angular/core';

@Component({
  template: '<p>Eager Component</p>'
})
export class EagerComponent {}
```

But more importantly, we can see that whenever we try to go to the path `lazy`, we are going to lazy load a module conveniently called `LazyModule`. Look closely at the definition of that route:

```js
{ path: 'lazy', loadChildren: 'lazy/lazy.module#LazyModule' }
```

There's a few important things to notice here:

1. We use the property `loadChildren` instead of `component`.
2. We pass a string instead of a symbol to avoid loading the module eagerly.
3. We define not only the path to the module but the name of the class as well.

There's nothing special about `LazyModule` other than it has its own `routing` and a component called `LazyComponent`.

_app/lazy/lazy.module.ts_

```js
import { NgModule } from '@angular/core';

import { LazyComponent }   from './lazy.component';
import { routing } from './lazy.routing';

@NgModule({
  imports: [routing],
  declarations: [LazyComponent]
})
export class LazyModule {}
```

> If we define the class `LazyModule` as the `default` export of the file, we don't need to define the class name in the `loadChildren` property as shown above.

The `routing` object is very simple and only defines the default component to load when navigating to the `lazy` path. 

_app/lazy/lazy.routing.ts_

```js
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LazyComponent } from './lazy.component';

const routes: Routes = [
  { path: '', component: LazyComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
```

Notice that we use the method call `forChild` instead of `forRoot` to create the routing object. We should always do that when creating a routing object for a feature module, no matter if the module is supposed to be eagerly or lazily loaded.

Finally, our `LazyComponent` is very similar to `EagerComponent` and is just a placeholder for some text.

_app/lazy/lazy.component.ts_

```js
import { Component } from '@angular/core';

@Component({
  template: '<p>Lazy Component</p>'
})
export class LazyComponent {}
```

[View Example](https://plnkr.co/edit/SGsAFpGhFX3vg3PysjnX?p=preview)

When we load our application for the first time, the `AppModule` along the `AppComponent` will be loaded in the browser and we should see the navigation system and the text "Eager Component". Until this point, the `LazyModule` has not being downloaded, only when we click the link "Lazy" the needed code will be downloaded and we will see the message "Lazy Component" in the browser. 

We have effectively lazily loaded a module.

