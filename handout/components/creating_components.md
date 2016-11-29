# Creating Components

Components in Angular 2 build upon the lessons learned from Angular 1.5. We define a component's application logic inside a class. To this we attach `@Component`, a TypeScript `decorator`, which allows you to modify a class or function definition and adds metadata to properties and function arguments.

- _selector_ is the element property that we use to tell Angular to create and insert an instance of this component.
- _template_ is a form of HTML that tells Angular what needs to be to rendered in the DOM.

The Component below will interpolate the value of `name` variable into the template between the double braces `{{name}}`, what get rendered in the view is `<p>Hello World</p>`.

``` js
import { Component } from '@angular/core';

@Component({
  selector: 'rio-app',
  template: '<p>Hello {{name}}</p>'
})
export class AppComponent {
  name: string;

  constructor() {
    this.name = 'World';
  }
}
```

We need to import the `Component` decarator from `@angular/core` before we can make use of it. To use this component we simply add `<rio-app></rio-app>` to the HTML file or another template, and Angular will insert an instance of the `AppComponent` view between those tags.

[View Example](http://plnkr.co/edit/bXrxWVkP2MWD8yNDYqVD?p=preview)
