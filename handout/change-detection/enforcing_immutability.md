# Enforcing Immutability

We cheated a little in the previous example. We told Angular that all of our inputs, including the `actor` object, were immutable objects, but we went ahead and updated its properties, violating the immutability principle. As a result we ended up with a sync problem between our models and our views. One way to enforce immutability is using the library [Immutable.js](https://facebook.github.io/immutable-js/).

Because in JavaScript primitive types like `string` and `number` are immutable by definition, we should only take care of the objects we are using. In this case, the `actor` object.

Here's an example comparing a mutable type like an `array` to an immutable type like a `string`:

```javascript
var b = ['C', 'a', 'r'];
b[0] = 'B';
console.log(b) // ['B', 'a', 'r'] => The first letter changed, arrays are mutable

var a = 'Car';
a[0] = 'B';
console.log(a); // 'Car' => The first letter didn't change, strings are immutable
```

First we need to install the `immutable.js` library using the command:

```
npm install --save immutable
```

Then in our `MainComponent` we import the library and use it to create an actor object as an immutable.

_app/main.component.ts_
```javascript
import {Component} from '@angular/core';
import {MovieComponent} from './movie.component';
import * as Immutable from 'immutable';

@Component({
  selector: 'main',
  template: `
    <h1>MovieApp</h1>
    <p>{{ slogan }}</p>
    <button type="button" (click)="changeActor()">Change Actor</button>
    <movie [title]="title" [actor]="actor"></movie>`
})
export class MainComponent {
  slogan: string = 'Just movie information';
  title: string = 'Terminator 1';
  actor: Immutable.Map<string, string> = Immutable.Map({firstName: 'Arnold', lastName: 'Schwarzenegger'});

  changeActor() {
    this.actor = this.actor.merge({firstName: 'Nicholas', lastName: 'Cage'});
  }
}
```

Now, instead of creating an instance of an `Actor` class, we are defining an immutable object using `Immutable.Map`. Because `this.actor` is now an immutable object, we cannot change its internal properties (`firstName` and `lastName`) directly. What we can do however is create another object based on `actor` that has different values for both fields - that is exactly what the `merge` method does.

Because we are always getting a new object when we try to change the `actor`, there's no point in having two different methods in our component. We removed the methods `changeActorProperties` and `changeActorObject` and created a new one called `changeActor`.

Additional changes have to be made to the `MovieComponent` as well. First we need to declare the `actor` object as an immutable type, and in the template, instead of trying to access the object properties directly using a syntax like `actor.firstName`, we need to use the `get` method of the immutable.

_app/movie.component.ts_
```javascript
import {Component, Input} from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import * as Immutable from 'immutable';

@Component({
  selector: 'movie',
  styles: ['div {border: 1px solid black}'],
  template: `
    <div>
      <h3>{{ title }}</h3>
      <p>
        <label>Actor:</label>
        <span>{{actor.get('firstName')}} {{actor.get('lastName')}}</span>
      </p>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent {
  @Input() title: string;
  @Input() actor: Immutable.Map<string, string>;
}
```

[View Example](http://plnkr.co/edit/MCMgTQTpYFkML7i7FWIH?p=preview)

Using this pattern we are taking full advantage of the "OnPush" change detection strategy and thus reducing the amount of work done by Angular to propagate changes and to get models and views in sync. This improves the performance of the application.
