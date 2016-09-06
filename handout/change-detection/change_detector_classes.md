# Change Detector Classes

At runtime, Angular 2 will create special classes that are called _change detectors_, one for every component that we have defined. In this case, Angular will create two classes: `MainComponent_ChangeDetector` and `MovieComponent_ChangeDetector`.

The goal of the change detectors is to know which model properties used in the template of a component have changed since the last time the change detection process ran.

In order to know that, Angular creates an instance of the appropriate change detector class and a link to the component that it's supposed to check.

In our example, because we only have one instance of the `MainComponent` and the `MovieComponent`, we will have only one instance of the `MainComponent_ChangeDetector` and the `MovieComponent_ChangeDetector`.

The code snippet below is a conceptual model of how the `MainComponent_ChangeDetector` class might look.

```javascript
class MainComponent_ChangeDetector {

  constructor(
    public previousSlogan: string,
    public previousTitle: string,
    public previousActor: Actor,
    public movieComponent: MovieComponent
  ) {}

  detectChanges(slogan: string, title: string, actor: Actor) {
    if (slogan !== this.previousSlogan) {
      this.previousSlogan = slogan;
      this.movieComponent.slogan = slogan;
    }
    if (title !== this.previousTitle) {
      this.previousTitle = title;
      this.movieComponent.title = title;
    }
    if (actor !== this.previousActor) {
      this.previousActor = actor;
      this.movieComponent.actor = actor;
    }
  }
}
```

Because in the template of our `MainComponent` we reference three variables (`slogan`, `title` and `actor`), our change detector will have three properties to store the "old" values of these three properties, plus a reference to the `MainComponent` instance that it's supposed to "watch". When the change detection process wants to know if our `MainComponent` instance has changed, it will run the method `detectChanges` passing the current model values to compare with the old ones. If a change was detected, the component gets updated.

> Disclaimer: This is just a conceptual overview of how change detector classes work; the actual implementation may be different.

## Change Detection Strategy: Default

By default, Angular defines a certain change detection strategy for every component in our application. To make this definition explicit, we can use the property `changeDetection` of the `@Component` decorator.

_app/movie.component.ts_
```javascript
// ...
import {ChangeDetectionStrategy} from '@angular/core';

@Component({
  // ...
  changeDetection: ChangeDetectionStrategy.Default
})
export class MovieComponent {
  // ...
}
```

[View Example](http://plnkr.co/edit/Z5gWPosxIpCqsBcepMEu?p=preview)

Let's see what happens when a user clicks the button "Change Actor Properties" when using the `Default` strategy.

As noted previously, changes are triggered by events and the propagation of changes is done in two phases: the application phase and the change detection phase.

**Phase 1 (Application):**

In the first phase, the application (our code) is responsible for updating the models in response to some event. In this scenario, the properties `actor.firstName` and `actor.lastName` are updated.

**Phase 2 (Change Detection):**

Now that our models are updated, Angular must update the templates using change detection.

Change detection always starts at the root component, in this case the `MainComponent`, and checks if any of the model properties bound to its template have changed, comparing the old value of each property (before the event was triggered) to the new one (after the models were updated). The `MainComponent` template has a reference to three properties, `slogan`, `title` and `actor`, so the comparison made by its corresponding change detector will look like:

- Is `slogan !== previousSlogan`? No, it's the same.
- Is `title !== previousTitle`? No, it's the same.
- Is `actor !== previousActor`? No, it's the same.

Notice that even if we change the properties of the `actor` object, we are always working with the same instance. Because we are doing a shallow comparison, the result of asking if `actor !== previousActor` will always be `false` even when its internal property values have indeed changed. Even though the change detector was unable to find any change, the **default strategy** for the change detection is **to traverse all the components of the tree** even if they do not seem to have been modified.

Next, change detection moves down in the component hierarchy and check the properties bound to the `MovieComponent`'s template doing a similar comparison:

- Is `title !== previousTitle`? No, it's the same.
- Is `actorFirstName !== previousActorFirstName`? **Yes**, it has changed.
- Is `actorLastName !== previousActorLastName`? **Yes**, it has changed.

Finally, Angular has detected that some of the properties bound to the template have changed so it will update the DOM to get the view in sync with the model.

## Performance Impact

Traversing all the tree components to check for changes could be costly. Imagine that instead of just having one reference to `<movie>` inside our `MainComponent`'s template, we have multiple references?

```html
<movie *ngFor="let movie of movies" [title]="movie.title" [actor]="movie.actor"></movie>`
```

If our movie list grows too big, the performance of our system will start degrading. We can narrow the problem to one particular comparison:

- Is `actor !== previousActor`?

As we have learned, this result is not very useful because we could have changed the properties of the object without changing the instance, and the result of the comparison will always be `false`. Because of this, change detection is going to have to check every child component to see if any of the properties of that object (`firstName` or `lastName`) have changed.

What if we can find a way to indicate to the change detection that our `MovieComponent` depends only on its inputs and that these inputs are immutable? In short, we are trying to guarantee that when we change any of the properties of the `actor` object, we  end up with a different `Actor` instance so the comparison `actor !== previousActor` will always return `true`. On the other hand, if we did not change any property, we are not going to create a new instance, so the same comparison is going to return `false`.

If the above condition can be guaranteed (create a new object every time any of its properties changes, otherwise we keep the same object) and when checking the inputs of the `MovieComponent` has this result:

- Is `title !== previousTitle`? No, it's the same.
- Is `actor !== previousActor`? No, it's the same.

then we can skip the internal check of the component's template because we are now certain that nothing has changed internally and there's no need to update the DOM. This will improve the performance of the change detection system because fewer comparisons have to be made to propagate changes through the app.
