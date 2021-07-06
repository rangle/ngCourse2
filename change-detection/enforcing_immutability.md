# Enforcing Immutability

We cheated a little in the previous example. We told Angular that all of our inputs, including the `actor` object, were immutable objects, but we went ahead and updated its properties, violating the immutability principle. As a result we ended up with a sync problem between our models and our views.

Because in JavaScript primitive types like `string` and `number` are immutable by definition, we should only take care of the objects we are using. In this case, the `actor` object.

Here's an example comparing a mutable type like an `array` to an immutable type like a `string`:

```javascript
var b = ["C", "a", "r"];
b[0] = "B";
console.log(b); // ['B', 'a', 'r'] => The first letter changed, arrays are mutable

var a = "Car";
a[0] = "B";
console.log(a); // 'Car' => The first letter didn't change, strings are immutable
```

#### A modern example of immutability

In modern JavaScript/Typescript, enforcing immutability is easier than ever, we no longer need to rely on additional libraries to enforce immutability, cutting down on our overhead.

Let's use this example below to illustrate

_app/app.component.ts_

```typescript
import { Component } from "@angular/core";
import { MovieComponent } from "./movie.component";

type Actor = {
  firstName: string;
  lastName: string;
  isActionHero: boolean;
}

@Component({
  selector: "app-root",
  template: `
    <h1>MovieApp</h1>
    <p>{{ slogan }}</p>
    <button type="button" (click)="changeActor(actor, {firstName: 'Nicholas', lastName: 'Cage'})">
      Change Actor
    </button>
    <app-movie [title]="title" [actor]="actor"></app-movie>
  `
})
export class AppComponent {
  slogan = "Just movie information";
  title = "Terminator 1";
  actor = {
    firstName: "Arnold",
    lastName: "Schwarzenegger",
    isActionHero: true
  };

  // this is great use of the Partial type utility in typescript 
  // https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype
  changeActor(originalActor: Actor, updatedFields: Partial<Actor>) {
    this.actor = {...originalActor, ...updatedFields};
  }
}
```

Above, we are utilizing [Object Spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#syntax), which is a fantastic way to ensure object immutability in our projects. It's important to, as often as possible, avoid any direct object property manipulation - as doing so can cause many issues when it comes to any of Angular's internal comparison by reference checks. For a high quality reactive application, immutability is key.

Because we are always getting a new object when we try to change the `actor`, there's no point in having two different methods in our component. We removed the methods `changeActorProperties` and `changeActorObject` and created a new one called `changeActor`.

Using this pattern we are taking full advantage of the "OnPush" change detection strategy and thus reducing the amount of work done by Angular to propagate changes and to get models and views in sync. This improves the performance of the application.
