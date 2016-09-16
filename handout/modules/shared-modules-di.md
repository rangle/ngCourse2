# Shared Modules and Dependency Injection

Now that we have proven that lazy loaded modules create their own branch on the Dependency Injection tree, we need to learn how to deal with services that are imported by means of a shared module in both an eager and lazy loaded module.

Let's create a new module called `SharedModule` and define the `CounterService` there.

_app/shared/shared.module.ts_

```js
import { NgModule } from '@angular/core';
import { CounterService } from './counter.service';

@NgModule({
  providers: [CounterService]
})
export class SharedModule {}
```

Now we are going to import that `SharedModule` in the `AppModule` and the `LazyModule`.

_app/app.module.ts_

```js
...
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ...
  ],
  declarations: [
    EagerComponent,
    ...
  ]
  ...
})
export class AppModule {}
```

_app/lazy/lazy.module.ts_

```js
...
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ...
  ],
  declarations: [LazyComponent]
})
export class LazyModule {}
```

With this configuration, the components of both modules will have access to the `CounterService`. We are going to use this service in `EagerComponent` and `LazyComponent` in exactly the same way. Just a button to increase the internal `counter` property of the service.

_app/eager.component.ts_

```js
import { Component } from '@angular/core';
import { CounterService } from './shared/counter.service';

@Component({
  template: `
    <p>Eager Component</p>
    <button (click)="increaseCounter()">Increase Counter</button>
    <p>Counter: {{ counterService.counter }}</p>
  `
})
export class EagerComponent {
  constructor(public counterService: CounterService) {}

  increaseCounter() {
    this.counterService.counter += 1;
  }
}
```

[View Example](https://plnkr.co/edit/7evZh7XMUxf9HPPKdqYa?p=preview)

If you play with the live example, you will notice that the `counter` seems to behave independently in `EagerComponent` and `LazyComponent`, we can increase the value of one counter without altering the other one. In other words, we have ended up with two instances of the `CounterService`, one that lives in the root of the DI tree of the `AppModule` and another that lives in a lower branch of the DI tree accessible by the `LazyModule`.

This is not neccessarily wrong, you may find situations where you could need different instances of the same service, but I bet most of the time that's not what you want. Think for example of an authentication service, you need to have the same instance with the same information available everywhere disregarding if we are using the service in an eagerly or lazy loaded module. 

In the next section we are going to learn how to have only one instance of a shared service.