# Lazy Loading and the Dependency Injection Tree

Lazy loaded modules create their own branch on the Dependency Injection (DI) tree. This means that it's possible to have services that belong to a lazy loaded module, that are not accessible by the root module or any other eagerly loaded module of our application.

To show this behaviour, let's continue with the example of the previous section and add a `CounterService` to our `LazyModule`.

_app/lazy/lazy.module.ts_

```js
...
import { CounterService } from './counter.service';

@NgModule({
  ...
  providers: [CounterService]
})
export class LazyModule {}
```

Here we added the `CounterService` to the `providers` array. Our `CounterService` is a simple class that holds a reference to a `counter` property.

_app/lazy/counter.service.ts_

```js
import { Injectable } from '@angular/core';

@Injectable()
export class CounterService {
  counter = 0;
}
```

We can modify the `LazyComponent` to use this service with a button to increment the `counter` property.

_app/lazy/lazy.component.ts_

```js
import { Component } from '@angular/core';

import { CounterService } from './counter.service';

@Component({
  template: `
    <p>Lazy Component</p>
    <button (click)="increaseCounter()">Increase Counter</button>
    <p>Counter: {{ counterService.counter }}</p>
  `
})
export class LazyComponent {

  constructor(public counterService: CounterService) {}

  increaseCounter() {
    this.counterService.counter += 1;
  }
}
```

[View Example](https://plnkr.co/edit/RUp3QhHWmxBIQQAAw2im?p=preview)

The service is working. If we increment the counter and then navigate back and forth between the `eager` and the `lazy` routes, the `counter` value will persist in the lazy loaded module. 

But the question is, how can we verify that the service is isolated and cannot be used in a component that belongs to a different module? Let's try to use the same service in the `EagerComponent`.

_app/eager.component.ts_

```js
import { Component } from '@angular/core';
import { CounterService } from './lazy/counter.service';

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

If we try to run this new version of our code, we are going to get an error message in the browser console:

```
No provider for CounterService!
```

What this error tells us is that the `AppModule`, where the `EagerComponent` is defined, has no knowledge of a service called `CounterService`. `CounterService` lives in a different branch of the DI tree created for `LazyModule` when it was lazy loaded in the browser.
