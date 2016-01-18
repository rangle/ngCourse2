# Part 6: Change Detection

Change detecion has changed in a big way between the old version of Angular and the new one. In Angular 1, the framework kept a long list of watchers (one for every property bound to our templates) that needed to be checked everytime a digest cycle was started. This was called *dirty checking* and it was the only change detection strategy available.

Because by default Angular 1 implemented two way data binding, the flow of changes was pretty much chaotic, models were able to change directives, directives were able to change models, directive were able to change another directives and models were able to change another models.

In Angular 2, **the flow of information is unidirectional**, even when using `ngModel` to implemente two way data binding, that is only syntactic sugar on top of unidrectional flow. In this new version of the framework, our code is responsible for updating the models. Angular is only going to be responsible to reflect those changes in the components and the DOM by means of the change detection.

_Change detection responsabilities_
![File Structure](images/change-detection.jpg)

## Change Detection Strategies in Angular 1 vs Angular 2

Another difference between both versions of the framework is the way the nodes of an application (directives or components) are checked to see if the DOM needs to be updated.

Because of the nature of two way data binding, in Angular 1 there was no guarantee that a parent node should be checked always before a child node. It was perfectly possible that a child node could also change a parent node or a sibling or any other node in the tree, and that in turn will trigger new updates down the chain. This made difficult for the change detector to traverse all the nodes without falling in a circular loop with the infamous message:

```
10 $digest() iterations reached. Aborting!
```

In Angular 2, there is guarantee that changes are propagated in an unidirectional way so the change detector can **traverse only once all the nodes** of the application, starting always from the root. That means that a parent component is always checked first than its children components.

_Tree traversing in Angular 1 vs Angular 2_

![File Structure](images/angular1-vs-angular2.jpg)

## How the Change Detection Works

Let's see how the change detection works with a simple example.

We are going to create a simple `MovieApp` to show information about one movie. This app is going to consist of two components, the `MovieComponent` that shows information about a movie, and the `MainComponent` which holds a reference to the movie with buttons to perform some actions.

As always, the first step is to create our `index.html` file using the html element defined in our root component of our app `MainComponent`.

_index.html_
```html
<html>
  <!-- ... -->
  <body>
    <main>Loading...</main>
  </body>
</html>
```

And the boot file to load the application.

_app/boot.ts_
```javascript
import {bootstrap} from 'angular2/platform/browser';
import {MainComponent} from './main.component';

bootstrap(MainComponent);
```

Then, our `MainComponent` will have three properties, the `slogan` of the app, the `title` of the movie and the lead `actor`. The last two properties are going to be passed to the `MovieComponent` element, referenced in the template.

_app/main.component.ts_
```javascript
import {Component} from 'angular2/core';
import {MovieComponent} from './movie.component';
import {Actor} from './actor.model';

@Component({
  selector: 'main',
  directives: [MovieComponent],
  template: `
    <h1>MovieApp</h1>
    <p>{{ slogan }}</p>
    <button type="button" (click)="changeActorProperties()">Change Actor Properties</button>
    <button type="button" (click)="changeActorObject()">Change Actor Object</button>
    <movie [title]="title" [actor]="actor"></movie>`
})
export class MainComponent {
  slogan: string = 'Just movie information';
  title: string = 'Terminator 1';
  actor: Actor = new Actor('Arnold', 'Schwarzenegger');
  
  changeActorProperties(): void {
    this.actor.firstName = 'Nicholas';
    this.actor.lastName = 'Cage';
  }
  
  changeActorObject(): void {
    this.actor = new Actor('Bruce', 'Willis');
  }
}
```

In the above code snippet, we can see that our component defines two buttons that trigger different methods. The `changeActorProperties` is going to update the lead actor of the movie by means of changing directly the properties of the `actor` object. In contrast, the method `changeActorObject` will change the information of the actor by creating a completely new instance of the `Actor` class.

The `Actor` model is pretty straightforward, is just a class that defines the `firstName` and the `lastName` of an actor. 

_app/actor.model.ts_
```javascript
export class Actor {
  constructor(
    public firstName: string,
    public lastName: string) {}
}
```

Finally, the `MovieComponent` shows the information provided by the MainComponent in its template.

_app/movie.component.ts_
```javascript
import {Component, Input} from 'angular2/core';
import {Actor} from './actor.model';

@Component({
  selector: 'movie',
  styles: ['div {border: 1px solid black}'],
  template: `
    <div>
      <h3>{{ title }}</h3>
      <p>
        <label>Actor:</label>
        <span>{{actor.firstName}} {{actor.lastName}}</span>
      </p>
    </div>`
})
export class MovieComponent {
  @Input() title: string;
  @Input() actor: Actor;
}
```

The final result of the app is shown in the screenshot below.

![File Structure](images/app-screenshot.png)

## Change Detection Strategy: Default

By default, Angular is defining certain change detection strategy for every component in our application. To make this definition explicit, we can use the property `changeDetection` of the `@Component` decorator.

_app/movie.component.ts_
```javascript
// ...
import {ChangeDetectionStrategy} from 'angular2/core';

@Component({
  // ...
  changeDetection: ChangeDetectionStrategy.Default
})
export class MovieComponent {
  // ...
}
```

[View Example](http://plnkr.co/edit/n6m7rOtxG5MU0tsRl5xX?p=preview)

The enum `ChangeDetectionStrategy` defines seven strategies: `CheckOnce`, `Checked`, `CheckAlways`, `Detached`, `OnPush`, `Default` and `DefaultObserver` as can be seen in the [docs](https://angular.io/docs/ts/latest/api/core/ChangeDetectionStrategy-enum.html). We are going to concetrate in the two main ones: `Default` and `OnPush`.

Lets see what happens when a user clicks the button "Change Actor Properties" whe using the `Default` strategy. 

As we discuss before, changes are triggered by events and the propagation of changes is done in two phases: the application phase and the change detection phase.

**Phase 1 (Application):**

In the first phase, the application (our code) is responsible for updating the models in response to some event. In this scenario, the properties `actor.firstName` and `actor.lastName` are updated.

**Phase 2 (Change Detection):**

Now that our models are updated, angular needs to update the templates using change detection.

Change detection always starts at the root component, in this case the `MainComponent` and it checks if any of the model properties bound to its template have changed, comparing the old value of each property (before the event was triggered) to the new one (after the models were updated). The `MainComponent` template has a reference to three properties, `slogan`, `title`, and `actor`, so the comparison made by the change detection will look like:

- Is `(old)slogan === (new)slogan` Yes.
- Is `(old)title === (new)title`? Yes.
- Is `(old)actor === (new)actor`? Yes.

Notice that even if we clearly changed the properties of the actor object, we are always working with the same `actor` instance so a shallow comparison will always return `true`. Even that apparently nothing changed in the template, the **default strategy** for the Change Detection is to traverse **all** the components of the tree whether or not they seem to be modified.

Next, change detection moves down in the component hierarchy and check the properties bound to the `MovieComponent`'s template doing a similar comparison:

- Is `(old)title === (new)title`? Yes.
- Is `(old)actor.firstName === (new)actor.firstName`? **No**.
- Is `(old)actor.lastName === (new)actor.lastName`? **No**.

Finally, Angular has detected that some of the properties bound to the template have changed so it will update the DOM to get the view in sync with the model.

## Performance Impact

Traversing all the tree component to check for changes could be costly. Imagine that instead of just having one reference to `<movie>` inside our `MainComponent`'s template, we have multiple references?

```html
<movie *ngFor="#movie of movies" [title]="movie.title" [actor]="movie.actor"></movie>`
```

If our movie list grows too big, the performance of our system will start degrading. We can narrow the problem to one particular comparison.

- Is `(old)actor === (new)actor`?

As we have learned, this result is of not much use because we could have changed the properties of the object without changing the instance, and the result of the comparison will always be `true`. Because of this, change detection is going to have to check every child component to see if any of the properties of that object (`firstName` or `lastName`) has changed.

What if we can find a way to indicate to the change detection that our `MovieComponent` depends only on its inputs and that these inputs are immutable? In short, we are trying to guarantee this condition (pseudo code)?:

```
if `(old)actor === (new)actor`
  then `(old)actor.firstName === (new)actor.firstName`
   and `(old)actor.lastName  === (new)actor.lastName`.
 ```

If this can be guaranteed, then when checking the inputs of the `MovieComponent` and having this result:

- Is `(old)title === (new)title`? Yes.
- Is `(old)actor === (new)actor`? Yes.

Then we can skip the internal check of the component's template because we are now certain that nothing has changed internally and there's no need to update the DOM. This will improve the performance of the change detection system because fewers comparison has to be made to propagate changes through the app.

## Change Detection Strategy: OnPush

To inform Angular that we are going to complain with the conditions mentioned before to improve performance, we are going to use the `OnPush` change detection strategy on the `MovieComponent`.

_app/movie.component.ts_
```javascript
// ...

@Component({
  // ...
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent {
  // ...
}
```

[View Example](http://plnkr.co/edit/bczNU8cnoNGnHckLbWt8?p=preview)

This will inform Angular that our component only depends on its inputs and that any object that is passed to it should be considered immutable. This time when we click the button "Change Actor Properties" nothing changes in the view.

Lets follow again the logic behind it. When the user clicks the button, the method `changeActorProperties` is called and the properties of the `actor` object get updated.

When change detector analyze the properties bound to the `MainComponent`'s template, it will see again the same picture as before:

- Is `(old)slogan === (new)slogan` Yes.
- Is `(old)title === (new)title`? Yes.
- Is `(old)actor === (new)actor`? Yes.

But this time, we told explictly Angular that our component only depends on its inputs and all of them are immutable. Angular then assumes that the `MovieComponent` hasn't change and skip the check for that component. Because we didn't enforced the `actor` object to be immutable, we end up with our model out of sync with the view.

Let's rerun the app but this time we will click the button `ChangeActorObject`. This time, we are creating a new instance of the `Actor` class and assing it to the `this.actor` object. When the change detection analyze the properties bound to the `MainComponent`'s template it will find:

- Is `(old)slogan === (new)slogan` Yes.
- Is `(old)title === (new)title`? Yes.
- Is `(old)actor === (new)actor`? **No**.

Because now change detection knows that the `actor` object changed (it's a new instance) it will go ahead and continue checking the template for `MovieComponent` to update its view. At the end, our templates and models end up being in sync.

## Enforcing immutability

As we can see, in the previous example we cheated a little. We told Angular that all of our inputs, including the `actor` object, were immutable objects, but we went ahead and updated its properties violating the immutability principle. As a result we ended with a sync problem between our models and our views. One way to enforce immutability is using the library [Immutable.js](https://facebook.github.io/immutable-js/).

Because in javascript primitive types like `string` and `number` are immutable by definition, we should only take care of the objects we are using. In this case, the `actor` object.

First, we need to install the `immutable.js` library using the command:

```
npm install --save immutable
```

Then, in our `MainComponent` we import the library and use it to create an actor object as an immutable.

_app/main.component.ts_
```javascript
///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>
import {Component} from 'angular2/core';
import {MovieComponent} from './movie.component';
import * as Immutable from '../node_modules/immutable/dist/immutable.js';

@Component({
  selector: 'main',
  directives: [MovieComponent],
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
  
  changeActor(): void {
    this.actor = this.actor.merge({firstName: 'Nicholas', lastName: 'Cage'});
  }
}
```

Now, instead of creating an instance of an `Actor` class, we are now defining an immutable object using `Immutable.Map`. Because `this.actor` is now an immutable object, we cannot change its internal properties `firstName` and `lastName` directly. What we can do however is to create another object based on `actor` that have different values for both fields and that is exactly what the `merge` method does.

Because we are always getting a new object when we tried to change the `actor`, there's not point on having two different methods in our component. We removed the methods `changeActorProperties` and `changeActorObject` and created a new one simply called `changeActor`.

Additional changes have to be made to the `MovieComponent` as well. First, we need to declare the `actor` object as an immutable, and in the template, instead of trying to access the object properties directly using a syntax like `actor.firstName`, we need to resort on the `get` method of the immutable.

_app/movie.component.ts_
```javascript
///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>
import {Component, Input} from 'angular2/core';
import {ChangeDetectionStrategy} from 'angular2/core';
import * as Immutable from '../node_modules/immutable/dist/immutable.js';

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

[View Example](http://plnkr.co/edit/8b76FU9lMc6C43L2TIWB?p=preview)

Using this pattern we are taking fully advantage of the "OnPush" change detection strategy and thus reducing the amount of work done by Angular to propagate changes and get models and views in sync, improving in turn the performance of our application.