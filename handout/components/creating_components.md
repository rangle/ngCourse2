# Creating Components

Components in Angular 2 build upon this idea. We define a Component's application logic inside a Class. To this we then attach a selector and a template.

- **Selector** is the element property that we can use to tell Angular to create and insert an instance of this component.
- **Template** is a form of HTML that tells Angular how to render this component.

``` js
import {Component} from 'angular2/core';

@Component({
	selector: 'ngc-hello-component',
	template: '<p>Hello, {{name}}</p>'
})
export class HelloComponent {
  name: string;
  constructor() {
    this.name = 'World';
  }
}
```

To use this component we simply add `<ngc-hello-component></ngc-hello-component>` to our HTML. And Angular will insert an instance of the `MyComponent` view between those tags.

[View Example](http://plnkr.co/edit/EGgaHWpGHFl1CDHBQtZl?p=preview)


