 # Accessing Child Component Classes #

 ## @ViewChild & @ViewChildren ##

The `@ViewChild` & `@ViewChildren` decorators allow access to the classes of child components of the current component.

`@ViewChild` selects one class instance of the given child component class when given a type.

For example, we can call `exampleFunction` which is on the child component `Hello` class:

```typescript
import {Component, ViewChild} from '@angular/core';
import {Hello} from './hello.component';

@Component({
    selector: 'app',
    template: `
      <div>
        <hello></hello>
      </div>
      <button (click)="onClick()">Call Child function</button>`
})
export class App {
  @ViewChild(Hello) child: Hello;

  constructor() {}

  onClick() {
    this.child.exampleFunction();
  }
}
```

We can also use `@ViewChildren` to get a list of class instances if there are multiple, which selects a `QueryList` of the elements:

```typescript
import {Component, QueryList, ViewChildren} from '@angular/core';
import {Hello} from './hello.component';

@Component({
    selector: 'app',
    template: `
      <div>
        <hello></hello>
        <hello></hello>
        <hello></hello>
      </div>
      <button (click)="onClick()">Call Child function</button>`
})
export class App {
  @ViewChildren(Hello) helloChildren: QueryList<Hello>;

  constructor() {}

  onClick() {
    this.helloChildren.forEach((child) => child.exampleFunction());
  }
}
```

As shown above, when given a class type `@ViewChild` & `@ViewChildren` select child components based on type. However, they can also be passed selector strings.

In the below, only the middle `hello` element is selected & called:

```typescript
import {Component, QueryList, ViewChildren} from '@angular/core';
import {Hello} from './hello.component';

@Component({
    selector: 'app',
    template: `
      <div>
        <hello></hello>
        <hello #middle></hello>
        <hello></hello>
      </div>
      <button (click)="onClick()">Call Child function</button>`
})
export class App {
  @ViewChildren('middle') helloChildren: QueryList<Hello>;

  constructor() {}

  onClick() {
    this.helloChildren.forEach((child) => child.exampleFunction());
  }
}
```

[View Example](http://plnkr.co/edit/619u9UjTxJyxAyEVJ0NE?p=preview)

## @ContentChild & @ContentChildren ##

`@ContentChild` & `@ContentChildren` work the same way as the equivalent `@ViewChild` & `@ViewChildren`, however, the key difference is that `@ContentChild` & `@ContentChildren` select from the [projected content](/handout/components/projection.md) within the component.

Also note that content children will not be set until `ngAfterContentInit` component lifecycle hook.

[View Example](http://plnkr.co/edit/VNHWmGMnOFXHN8cEsN9N?p=preview)
