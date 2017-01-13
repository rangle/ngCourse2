# Passing Data into a Component

There are two ways to pass data into a component, with 'property binding' and 'event binding'. In Angular 2, data and event change detection happens top-down from parent to children. However for Angular 2 events we can use the DOM event mental model where events flow bottom-up from child to parent. So, Angular 2 events can be treated like regular HTML DOM based events when it comes to cancellable event propagation.

The `@Input()` decorator defines a set of parameters that can be passed down from the component's parent. For example, we can modify the `HelloComponent` component so that `name` can be provided by the parent.

```js
import { Component, Input } from '@angular/core';

@Component({
  selector: 'rio-hello',
  template: '<p>Hello, {{name}}!</p>',
})
export class HelloComponent {
  @Input() name: string;
}
```

The point of making components is not only encapsulation, but also reusability. Inputs allow us to configure a particular instance of a component.

We can now use our component like so:

```html
<!-- To bind to a raw string -->
<rio-hello name="World"></rio-hello>
<!-- To bind to a variable in the parent scope -->
<rio-hello [name]="helloName"></rio-hello>
```
[View Example](http://plnkr.co/edit/LEtEN9?p=preview)

>Unlike Angular 1.x, this is one-way binding.
