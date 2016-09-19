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

In contrast, when import the same module in our `LazyModule` we will not call the `forRoot` method because we don't want to register the service again in a different level of the DI tree, so the declaration of the `LazyModule` doesn't change.

_app/lazy/lazy.module.ts_

```js
...
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ...
  ],
  ...
})
export class LazyModule {}
```

[View Example](https://plnkr.co/edit/xz5wZvqQvzdD0uOZYXg4?p=preview)

This time, whenever we change the value of the `counter` property, this value is shared between the `EagerComponent` and the `LazyComponent` proving that we are using the same instance of the `CounterService`.