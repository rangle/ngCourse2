# Passing Data into a Component

There are two ways to pass data into a component, with 'property binding' and 'event binding'. Data flows top-down from parent into children, while events flow bottom-up from child to parent. Events works just like they do in regular HTML DOM based events, which makes event propagation cancelable.

The `@Input()` decarator defines a set of parameters that can be passed down from the component's parent. For example, we can modify the `Hello` component so that `name` can be configured by the parent.

```js
import {Component, Input} from '@angular/core';

@Component({
  selector: 'hello',
  template: '<p>Hello, {{name}}</p>'
})
export class Hello {
  @Input() name: string;
}
```

The point of making components is not only encapsulation, but also reusability. Inputs allow us to configure a particular instance of a component.

We can now use our component like so:

```html
<!-- To bind to a raw string -->
<hello name="World"></hello>
<!-- To bind to a variable in the parent scope -->
<hello [name]="name"></hello>
```

[View Example](http://plnkr.co/edit/GbpCKy?p=preview)

>Unlike Angular 1.x, this is one-way binding.
