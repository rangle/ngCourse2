# Sharing the Same Dependency Injection Tree

So far our problem is that we are creating two instances of the same services in different levels of the DI tree. The instance created in the lower branch of the tree is shadowing the one defined at the root level. The solution? To avoid creating a second instance in a lower level of the DI tree for the lazy loaded module and only use the service instance registered at the root of the tree.

To accomplish that, we need to modify the definition of the `SharedModule` and instead of defining our service in the `providers` property, we need to create a static method called `forRoot` that exports the service along with the module itself.

_app/shared/shared.module.ts_

```js
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CounterService } from './counter.service';

@NgModule({})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [CounterService]
    };
  }
}
```

With this setup, we can import this module in our root module `AppModule` calling the `forRoot` method to register the module and the service.

_app/app.module.ts_

```js
...
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    SharedModule.forRoot(),
    ...
  ],
  ...
})
export class AppModule {}
```

We should **only** call `forRoot` in the root application module and no where else. This ensures that only a single instance of your service exists at the root level. Calling `forRoot` in another module can register the service again in a different level of the DI tree. 

Since `SharedModule` only consists of a service that Angular registers in the root app injector, we do not need to import it in `LazyModule`. This is because the lazy loaded module will already have access to services defined at the root level.

[View Example](https://plnkr.co/edit/dPpc40plyI8iu8ogrf3e?p=preview)

This time, whenever we change the value of the `counter` property, this value is shared between the `EagerComponent` and the `LazyComponent` proving that we are using the same instance of the `CounterService`.

However it is very likely that we may have a component, pipe or directive defined in `SharedModule` that we'll need in another module. Take the following for example.

_app/shared/shared.module.ts_

```ts
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CounterService } from './counter.service';

import { HighlightDirective } from './highlight.directive';

@NgModule({
  declarations: [HighlightDirective],
  exports: [ HighlightDirective ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [CounterService]
    };
  }
}
```

In here, we declare and export `HighlightDirective` so other modules that import `SharedModule` can use it in their templates. This means we can just import the module in `LazyModule` normally.

_app/lazy/lazy.module.ts_

```ts
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { LazyComponent }   from './lazy.component';
import { routing } from './lazy.routing';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [LazyComponent]
})
export class LazyModule {}
```

Now we can use this directive within `LazyModule` without creating another instance of `CounterService`.

[View Example](https://plnkr.co/edit/kqat7k4YhLSDKrjr8x2f?p=preview)