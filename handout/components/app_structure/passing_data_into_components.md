# Passing Data into a Component

The `inputs` attribute defines a set of parameters that can be passed down from the component's parent. For example, we can modify the `Hello` component so that `name` can be configured by the parent.

```js
import {Component} from '@angular/core';

@Component({
  selector: 'hello',
  inputs: ['name'],
  template: '<p>Hello, {{name}}</p>'
})
export class Hello {
  name: string;
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

[View Example](http://plnkr.co/edit/R0ayQkjksKeE7NR8CK7F?p=preview)

>Unlike Angular 1.x, this is one-way binding.
