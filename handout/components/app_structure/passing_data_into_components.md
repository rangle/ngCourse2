# Passing Data into a Component

The `inputs` attribute defines a set of parameters that can be passed down from the component's parent. For example, we can modify the `HelloComponent` such that `name` can be configured by the parent.

```js
import {Component} from 'angular2/core';

@Component({
  selector: 'ngc-hello-component',
  inputs: ['name'],
  template: '<p>Hello, {{name}}</p>'
})
export class HelloComponent {
  name: string;
}
```

The point of making components is not only encapsulation, but also re-usability. Inputs allow us to configure a particular instance of a component.

We can now use our component like so:

```html
<!-- To bind to a raw string -->
<ngc-hello-component name="World"></ngc-hello-component>
<!-- To bind to a variable in the parent scope -->
<ngc-hello-component [name]="name"></ngc-hello-component>
```

[View Example](http://plnkr.co/edit/fwl33enZyoDQ2DDrujYV?p=preview)

*Note* unlike Angular 1.x this is one-way binding.

<iframe style="width: 100%; height: 600px" src="https://embed.plnkr.co/fwl33enZyoDQ2DDrujYV" frameborder="0" allowfullscren="allowfullscren"></iframe>

