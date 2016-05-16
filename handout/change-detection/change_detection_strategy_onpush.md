# Change Detection Strategy: OnPush

To inform Angular that we are going to comply with the conditions mentioned before to improve performance, we are going to use the `OnPush` change detection strategy on the `MovieComponent`.

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

[View Example](http://plnkr.co/edit/1qpXrvcUY1sE7wWuOSPo?p=preview)

This will inform Angular that our component only depends on its inputs and that any object that is passed to it should be considered immutable. This time when we click the button "Change Actor Properties" nothing changes in the view.

Lets follow again the logic behind it. When the user clicks the button, the method `changeActorProperties` is called and the properties of the `actor` object get updated.

When the change detection analyzes the properties bound to the `MainComponent`'s template, it will see the same picture as before:

- Is `slogan !== previousSlogan` No, it's the same.
- Is `title !== previousTitle`? No, it's the same.
- Is `actor !== previousActor`? No, it's the same.

But this time, we explicitly told Angular that our component only depends on its inputs and all of them are immutable. Angular then assumes that the `MovieComponent` hasn't changed and will skip the check for that component. Because we didn't force the `actor` object to be immutable, we end up with our model out of sync with the view.

Let's rerun the app but this time we will click the button `ChangeActorObject`. This time, we are creating a new instance of the `Actor` class and assigning it to the `this.actor` object. When change detection analyzes the properties bound to the `MainComponent`'s template it will find:

- Is `slogan !== previousSlogan` No, it's the same.
- Is `title !== previousTitle`? No, it's the same.
- Is `actor !== previousActor`? **Yes**, it has changed.

Because now change detection knows that the `actor` object changed (it's a new instance) it will go ahead and continue checking the template for `MovieComponent` to update its view. At the end, our templates and models end up being in sync.
