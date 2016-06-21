# Creating Components

Components in Angular 2 build upon this idea. We define a component's application logic inside a class. To this we then attach a selector and a template.

- _selector_ is the element property that we use to tell Angular to create and insert an instance of this component.
- _template_ is a form of HTML that tells Angular how to render this component.

``` js
import {Component} from '@angular/core';

@Component({
	selector: 'hello',
	template: '<p>Hello, {{name}}</p>'
})
export class Hello {
  name: string;

  constructor() {
    this.name = 'World';
  }
}
```

To use this component we simply add `<hello></hello>` to our HTML, and Angular will insert an instance of the `Hello` view between those tags.

[View Example](http://plnkr.co/edit/t0qf2zbM5C42Ni44IYmY?p=preview)

<iframe class="no-pdf" style="width: 100%; height: 400px" src="http://embed.plnkr.co/t0qf2zbM5C42Ni44IYmY/" frameborder="0" allowfullscren="allowfullscren"></iframe>
