### Components in Angular 2

.img-max-width[![components](../img/components.jpg)]

.bottom-comment[A <a href="http://rangle.io/" target="\_blank">Rangle.io</a> Webinar]

---

### Component-Oriented Architecture

* Presents your application as a tree of UI components.
* Each 'component' can be thought of as a custom HTML 'primitive'
  * ... that you build yourself using JavaScript and CSS
* Not a new idea:
  * <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components"
    target="\_blank">Web Components</a>
  * <a href="https://www.polymer-project.org/1.0/"
    target="\_blank">Google Polymer</a>
* <a href="https://angularjs.org/"
  target="\_blank">Angular 1.x</a>
  supported it in a limited way
* <a href="https://facebook.github.io/react/"
  target="\_blank">ReactJS</a> made it mainstream
* It's the central concept of <a href="https://angular.io/"
  target="\_blank">Angular 2</a>

---

### The Evolution of Angular Components

Angular 1.3: Using a directive to implement a component:

```javascript
angular.module('ngcourse')
  .directive('ngcHelloComponent', () => ({
      restrict: 'E',
      replace: true,
      scope: { name: '=' },
      template: '<span>Hello, {{ ctrl.name }}.</span>',
      controller: function MyComponentCtrl() {
        // Component logic here.
      },
      controllerAs: 'ctrl',
      bindToController: true
    })
  );
```

---

### The Evolution of Angular Components

Isolated `scope` and `bindToController` give an encapsulated, reusable 'HTML
primitive' we can use in our DOM:

```html
<body>
  <ngc-hello-component name="Alice"></ngc-hello-component>
  <ngc-hello-component name="Bob"></ngc-hello-component>
  <ngc-hello-component name="World"></ngc-hello-component>
</body>
```

You can start to imagine an web app as a composable set of custom 'HTML Primitives' like this!

---

### The Evolution of Angular Components

* This way of using directives got very popular
* Angular 1.5 introduced first-class support for the pattern
* The new `.component` function:

```javascript
angular.module('ngcourse')
  .component('ngcHelloComponent', {
    bindings: { name: '=' },
    template: '<span>Hello, {{ ctrl.name }}.</span>',
    controller: function MyComponentCtrl() {
      // component logic here.
    }
  });
```

---

### The Evolution of Angular Components

In Angular 2 it's the main way to build UI:

```typescript
import {Component} from 'angular2/core';

@Component({
  selector: 'ngc-hello-component',
  template: '<p class="hello">Hello, {{name}}</p>',
  styles: [ '.hello { color: purple; }' ]
})
export class HelloComponent {
  name: string;
  constructor() {
    this.name = 'World';
  }
}
```

* Structure as an HTML `template`
* 'DOM name' using the `selector` property
* Styling using the `styles` property
* Behaviour using methods and properties on the `class`

.bottom-comment[<a target="\_blank" href="http://plnkr.co/edit/Z7KNUe8UcooxO6dfAayL?p=preview">See it live</a>]

---

### Architectural Considerations

* Angular requires one top-level (bootstrap) component
* Other components can be very granular
* Most components are presentational

  * Very little logic
  * Very little state
  * Maybe even just markup and CSS
  * Highly re-usable

* Motivation: Atomic Design (http://bradfrost.com/blog/post/atomic-web-design/)
  * Comes from the design World
  * Intersection of UI development and graphic design/branding
  * Encapsulation of presentation instead of behaviour or state

* We're all converging on components!

---

### Atomic Design

> We’re not designing pages, we’re designing systems of components.
>
> .attribution[—Stephen Hay]

* We build up our UIs from very granular components or 'atoms'
* They are highly re-usable
* Incorporate design and branding at the lowest widget level:

.center[![atoms](../img/atoms.png)]

---

### Atomic Design

* These atoms form a 'living style guide'
* Are combined into more useful 'molecules', 'organisms', and finally 'pages':

.center[![molecule](../img/molecule.png)]


.flex.justify-between.bold.rangle-purple.caps[
  .block[More Reusable]
  .block[Less Reusable]]

.img-max-width[![left-bar](../img/bar-max-left.svg)]

.flex.justify-between.bold.rangle-purple.caps[
  .block.border.rounded.p1[Atoms]
  .block.border.rounded.p1[Molecules]
  .block.border.rounded.p1[Organisms]
  .block.border.rounded.p1[Pages]]

.img-max-width[![right-bar](../img/bar-max-right.svg)]

.flex.justify-between.bold.rangle-purple.caps[
  .block[Less Complex]
  .block[More Complex]]

---

### Container vs. Presentational Components

There are two kinds of components:

* __Container Components:__ Usually at the top-level of a page

  * Wire together data and business logic
  * Render a tree of presentational components
  * Are difficult to reuse

* __Presentational Components:__ 90% of your render tree

  * Contain no state - pure functions of their attributes.
  * Presentational only
  * Highly re-usable.

---

### Passing Data into a Component

Let's build a re-usable version of one of our atoms from earlier.

We'll need to pass data into the component.

```typescript
import { Component, Input } from 'angular2/core';

@Component({
  selector: 'rangle-label',
  template: '<label class="rangle-label">{{ name }}</label>',
  styles: [ `
    .rangle-label {
      color: #422D3F;
      display: block;
      font-weight: bold;
      letter-spacing: .2em;
      text-transform: uppercase;
    }
  `]
})
export class RangleLabel {
  @Input() private name: string;
}
```

---

### Passing Data into a Component

* Use the `@Input` annotation to define a 'property' on our component.
* It gets mapped to a property on the component's class
* It can be displayed in our component's template using
<a href="https://angular.io/docs/ts/latest/guide/template-syntax.html#!#interpolation"
  target="\_blank">interpolation</a> (`{{ }}`)

A parent component can pass an arbitrary value for `name` using 'property
binding' (`[foo]="bar"`):

```typescript
import { Component } from 'angular2/core';
import { RangleLabel }  from './rangle-label';

@Component({
	selector: 'hello',
	directives: [ RangleLabel ],
	template: `
	  <rangle-label [name]="labelText">
	  </rangle-label>
	`
})
export class App {
  private labelText = "Search the site";
}
```

.bottom-comment[<a href="http://plnkr.co/edit/p6BqSrUkPM7pXEVVbGrW?p=preview"
  target="\_blank">See it live</a>]

---

### Responding to Component Events

Our `RangleButton` atom also needs to react to clicks to be useful. Here's an
`@Component` decorator for `RangleButton`:

```typescript
@Component({
  selector: 'rangle-button',
  template: `
    <button [ngClass]="dynamicStyles()"
      class="rangle-button"
      (click)="onClick.emit()">
      {{ name }}
    </button>`,
  styles: [ `
    .rangle-button {
      border: none;
      border-radius: 3px;
      color: white;
      font-weight: bold;
      letter-spacing: .2em;
      padding: 0.5rem;
      text-transform: uppercase;
    }
    .primary { background: #E5373A; }
    .normal  { background: #422D3F; }
  `]
})
```

---

### Responding to Component Events

And here's the corresponding component `class`:

```typescript
import { Component, Input, Output, EventEmitter } from 'angular2/core'

export class RangleButton {
  @Input() name: string;
  @Input() isPrimary: boolean;
  @Output() onClick: new EventEmitter<void>();

  dynamicStyles() {
    return this.isPrimary ? 'primary' : '';
  }
}
```

* The button component binds to the browser's `click` event using 'event binding'
(`(click)="someExpression"`).
* The bound expression emits an event using the `EventEmitter` class.
* These events are exposed on the component's interface using the `@Output`
decorator.
* Note that we've also defined another `@Input` to show an example of dynamic
styling.

.bottom-comment[<a href="http://plnkr.co/edit/zmKECakOxW1eo4GKkQgt?p=preview"
  target="\_blank">See it live</a>]

---

### Responding to Component Events

We can do something similar for our `RangleTextField` atom:

```typescript
@Component({
  selector: 'rangle-text-field',
  template: `
    <input class="rangle-text-field"
      [placeholder]="placeholder"
      #field (keyup)="handleKeyup(field.value)">
  `,
  styles: [ `
    .rangle-text-field {
      border-radius: 3px;
      border: 1px solid #ccc;
      box-sizing: border-box;
      display: inline-block;
      font-size: inherit;
      font-weight: inherit;
      height: 2.5rem;
      margin-bottom: 1rem;
      padding: .5rem;
    }
  `]
})
```

---

### Responding to Component Events

```typescript
export class RangleTextField {
  @Input() placeholder: string;
  @Input() value: String;
  @Output() valueChange = new EventEmitter<string>();

  handleKeyup(fieldValue: string): void {
    this.valueChange.emit(fieldValue);
  }
}```

Not much different here, except that we are passing data in our `EventEmitter`.

Note the naming of `@Input value` and `@Output valueChange`: this allows
the parent component to use 'two-way binding' (`[(value)]`) for the `value` property:

```html
<rangle-text-field placeholder="This is a text field"
  [(value)]="displayValue">
</rangle-text-field>
<p>Input value: {{ displayValue }}</p>
```

```typescript
export class App {
  private displayValue: string;
}
```

.bottom-comment[<a href="http://plnkr.co/edit/366FJDDq9lCF6ZpBkIus?p=preview"
  target="\_blank">See it live</a>]

---

### Combine it All Into a Molecule

We now have all the atoms we need to build our search bar molecule from earlier.
Since things are getting a little bigger now we'll put our styles and HTML into
their own files.

```typescript
import { Component, Output, EventEmitter } from 'angular2/core';
import { RangleButton } from './rangle-button';
import { RangleLabel } from './rangle-label';
import { RangleTextField } from './rangle-text-field';

@Component({
  selector: 'rangle-search-bar',
  directives: [ RangleLabel, RangleButton, RangleTextField ],
  templateUrl: 'app/rangle-search-bar.html',
  styleUrls: [ 'app/rangle-search-bar.css' ]
})
export class RangleSearchBar {
  private inputValue: string;

  handleSearch() {
    alert(`You searched for '${this.inputValue}'`);
  }
}
```

---

### Combine it All Into a Molecule

Here's the molecule's  template:

```html
<rangle-label name="Search the site">
</rangle-label>
<div class="row">
  <rangle-text-field placeholder="Enter Keyword"
    [(value)]="inputValue">
  </rangle-text-field>
  <rangle-button name="Search"
    [isPrimary]="true"
    (click)="handleSearch(inputValue)">
  </rangle-button>
</div>
```

---

### Combine it All Into a Molecule

And here are the molecule's styles:

```css
:host {
  background: #F8F8F8;
  border: solid #ccc 1px;
  display: block;
  margin: 1rem;
  padding: 1rem;
}
.row {
  display: flex;
  margin-top: 0.5rem;
}
```

Note that each atom defines its own styles, but the molecule defines the
layout between them.

Also note that we can style our component DOM node (`<rangle-button>`) using
the `:host` selector.

.bottom-comment[<a href="http://plnkr.co/edit/X3ImJq3ZbUIamhqnUACT?p=preview"
  target="\_blank">See it live</a>]

---

### Statelessness

Note that all the things we've built are still presentational components.
* Even the molecule
* No state
* Pure functions of their `@Input()`s  that generate `@Output()`s and DOM
with no side-effects.

> Statelessness is the __the first key to reusable components.__

---


### Nesting Components with Projection

What if we wanted to re-use the same component for the search bar layout, but
with other contents?

Let's use `projection`!

Projection has two main benefits:
* It makes your components more reusable
* It can make your UI tree flatter and more manageable

Let's reimplement the search bar with a generic `RangleBar`:

---

### Nesting Components with Projection

Our template:

```html
<rangle-label [name]="name">
</rangle-label>
<div class="row">
  <ng-content></ng-content>
</div>
```

Our TypeScript:

```typescript
@Component({
  selector: 'rangle-bar',
  directives: [ RangleLabel ],
  templateUrl: 'app/rangle-bar.html',
  styleUrls: [ 'app/rangle-bar.css' ]
})
export class RangleBar {
  @Input() name: string;
}
```

---

### Nesting Components with Projection

And our CSS:

```css
:host {
  background: #F8F8F8;
  border: solid #ccc 1px;
  display: block;
  padding: 1rem;
  margin: 1rem;
}
.row {
  display: flex;
  margin-top: 0.5rem;
}
```

---

### Nesting Components with Projection

Now we have a general layout component that can be reused for multiple things:

```html
<rangle-bar name="Search the site">
  <rangle-text-field placeholder="Enter Keyword"
    [(value)]="searchTerm">
  </rangle-text-field>
  <rangle-button name="Search"
    [isPrimary]="true"
    (click)="handleSearch(searchTerm)">
  </rangle-button>
</rangle-bar>

<rangle-bar name="Other Stuff">
  <rangle-button name="Button 1"
    [isPrimary]="true">
  </rangle-button>
  <rangle-button name="Button 2"></rangle-button>
  <rangle-button name="Button 3"></rangle-button>
</rangle-bar>
```

There's actually quite a lot more you can do with projection.
<a href="http://plnkr.co/edit/LgCjXI5QH7jZkXgwwnsF?p=preview"
 target="\_blank">Click here for an advanced demo</a>.

> Good use of projection is __the second key to reusable components__.

.bottom-comment[<a href="http://plnkr.co/edit/r9t83IQdRkIrgPSfDWRY?p=preview"
  target="\_blank">See it live</a>]

---

### Scoping Styles with `ViewEncapsulation`

* The global nature of CSS definitions presents a challenge for component
design.
* How can we make sure that CSS classes in our components don't conflict
with each other?

Consider this code:

```html
<html>
  <head>
    <!-- SystemJS/Angular stuff... --->
    <style type="text/css">
      p { border: dashed blue 2px }
    </style>
  </head>
  <body>
    <app>Loading...</app>
    <p>P outside a component</p>
  </body>
</html>
```
```typescript
@Component({
  selector: 'app',
  template: `<p>P inside a component</p>`,
  styles: [ 'p { background: red }' ]
})
export class App {}
```

---

### Scoping Styles with `ViewEncapsulation`

You might expect to see both paragraphs rendered with a dashed blue border
and a red background.

Instead, you see this:

<iframe style="width: 100%; height: 200px" frameborder="0"
  allowfullscren="allowfullscren"
  src="http://embed.plnkr.co/0SrT48rfyQN8oULtJoFq/">
</iframe>

What's going on?

.bottom-comment[<a href="http://plnkr.co/edit/0SrT48rfyQN8oULtJoFq?p=preview"
  target="\_blank">See it live</a>]

---

### Scoping Styles with `ViewEncapsulation`

It turns out that AngularJS is modifying the `<app>` component's styles:

```css
/* This is the definition from the App component. */
p[_ngcontent-qpw-1] {
    background: #F00;
}
/* This is the global definition from index.html */
p {
    border: dashed #00F 2px;
}
```

Angular2 has generated a unique attribute for your component (`_ngcontent-qpw-1`)
and used it to scope the CSS selectors defined in the `style` property of
`@Component`.

```html
<app _nghost-qpw-1="">
  <p _ngcontent-qpw-1="">P inside a component</p>
</app>
```

This is a great feature - you can now property encapsulate your component's
CSS styles too.

> view encapsulation is __the third key to reusable components__.

---

### Scoping Styles with `ViewEncapsulation`

Angular2 lets you control this feature using the 'encapsulation' property
of `@Component`:

```typescript
import { ViewEncapsulation, Component } from 'angular2/core';

@Component({
  // ...
  encapsulation: ViewEncapsulation.Emulated
})
```

There are three settings:

* `ViewEncapsulation.Emulated` (the default): the component will respect styles
from global stylesheets, but scope anything from `@Component`'s `styles` or
`styleUrls` properties.
* `ViewEncapsulation.None`: this component's styles are global.
* `ViewEncapsulation.Native`: this component's styles are scoped, and the
component ignored global styles from other places.

Let's <a href="http://plnkr.co/edit/0SrT48rfyQN8oULtJoFq?p=preview"
  target="\_blank">see that in action</a>.

---

### Managing the Component Lifecycle

A Component has a lifecycle managed by Angular itself. Angular manages creation,
rendering, data-bound properties etc. It also offers hooks that allow us to
respond to key lifecycle events.

Here is the complete lifecycle hook interface inventory:

- `ngOnChanges` - called when an input or output binding value changes
- `ngOnInit` - after the first `ngOnChanges`
- `ngDoCheck` - developer's custom change detection
- `ngAfterContentInit` - after component content initialized
- `ngAfterContentChecked` - after every check of component content
- `ngAfterViewInit` - after component's view(s) are initialized
- `ngAfterViewChecked` - after every check of a component's view(s)
- `ngOnDestroy` - just before the component is destroyed.

📄 from <a href="https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html"
  target="\_blank">Component Lifecycle</a>

.bottom-comment[<a href="http://plnkr.co/edit/0fuHvJn8SFm8sE0C33F0?p=preview"
  target="\_blank">See it live</a>]

---

### DOM Manipulation with ElementRef

* Angular2 gives you the ability to access your element's root DOM node.
* Do this by injecting the `ElementRef` service into your component.

```typescript
import {Component, ElementRef} from 'angular2/core';

@Component({
  selector: 'todo-app',
  template: `...`
})
export class TodoApp {
  constructor(private elementRef: ElementRef) {
    const container = this.elementRef.nativeElement;
  }
}
```

__Use this feature sparingly__ - directly manipulating the DOM breaks
sacrifices many of the benefits of Angular2's component architecture.

.bottom-comment[<a href="http://plnkr.co/edit/QkNbKQh6ya1WX0YdUahX?p=preview"
  target="\_blank">See it live</a>]

---

### Conclusion

* Modern web development is converging on a 'component-oriented' architecture
* Your app's view is a tree of simple, granular components.
* Components encapsulate their own JavaScript, HTML, and CSS into one unit
* No longer separating concerns by technology but instead by functionality.
  * Presentation is an important part of that functionality.

* Tips for reusable components:
  * Use statelessness to keep them simple
  * Use projection to keep them generic
  * Use ViewEncapsulation to keep them isolated
  * Keep them small and granular

* Where needed, Angular provides advanced features to help you when the component
model is insufficient:
  * `ElementRef`
  * Lifecycle hooks

* Try to use these advanced features sparingly

---

### Resources

Documentation:

  * <a target="\_blank" href="https://angular.io">Google's Angular 2
  Documentation</a>
  * <a target="\_blank"
  href="https://www.gitbook.com/book/rangle-io/ngcourse2/details">Rangle.io's
  Angular 2 GitBook</a>

Rangle Starter Setups:

  * <a target="\_blank"
    href="https://github.com/rangle/angular2-starter">Angular2 with
    TypeScript and Webpack</a>
  * <a target="\_blank"
    href="https://github.com/rangle/angular2-redux-starter">Angular2 with
    TypeScript, Webpack, and Redux</a>

Examples:
* <a target="\_blank"
  href="https://github.com/rangle/ngCourse2/tree/master/examples/components">
  Locally runnable Plunkr Examples from this Webinar and from the gitbook</a>

To run these examples locally:

```sh
git clone https://github.com/rangle/ngCourse2.git
npm install -g live-server

# Where '...' is a specific example folder:
cd ngCourse2/examples/components/webinar/...
live-server .
```
