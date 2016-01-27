<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Part 3: Components in Angular 2](#part-3-components-in-angular-2)
  - [Creating Components](#creating-components)
  - [Application Structure with Components](#application-structure-with-components)
    - [Passing Data into a Component](#passing-data-into-a-component)
    - [Responding to Component Events](#responding-to-component-events)
    - [Two-Way Data Binding](#two-way-data-binding)
  - [Structural Directives](#structural-directives)
      - [The Asterisk (*) Syntax](#the-asterisk--syntax)
      - [Iteration with `ngFor`](#iteration-with-ngfor)
  - [Projection](#projection)
      - [Child Component](#child-component)
  - [Structuring Applications with Components](#structuring-applications-with-components)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Part 3: Components in Angular 2

This course will be organized around building a collaborative task manager. We will start by building a client app, which we will later connect to a REST API. Our first task is to setup a simple Angular app consisting of a few components, and to understand how they fit together.

![components](../img/components.jpg)

The core concept of any Angular 2 application is the *component*. In effect, the whole application can be modelled as a tree of these components.

This is how the Angular 2 team defines a component:

> A Component controls a patch of screen real estate that we could call a view, and declares reusable UI building blocks for an application.

Basically, a component is anything that is visible to the end user and which can be reused many times within an application.

In Angular 1.x we had router views and directives which worked sort of like components. The idea of directive components became quite popular. They were created by using directive with a controller while relying on the `controllerAs` and `bindToController`. For example:

```js
angular.module('ngcourse')
  .directive('ngcHelloComponent', () => ({
      restrict: 'E',
      replace: true,
      scope: { name: '=' },
      template: '<span>Hello, {{ ctrl.name }}.</span>',
      controller: MyComponentCtrl,
      controllerAs: 'ctrl',
      bindToController: true
    })
  );
```

In fact, this concept became so popular that in Angular 1.5 the `.component` method was introduced as syntactic sugar.

```js
angular.module('ngcourse')
  .component('ngcHelloComponent', {
    bindings: { name: '=' },
    template: '<span>Hello, {{ ctrl.name }}.</span>',
    controller: MyComponentCtrl
  });
```


## Creating Components

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


## Application Structure with Components

A useful way of conceptualizing Angular application design is to look at it as a tree of nested components each having an isolated scope.

For example consider the following:

```html
<TodoApp>
  <TodoList>
    <TodoItem />
    <TodoItem />
    <TodoItem />
  </TodoList>
  <TodoForm />
</TodoApp>
```

At the root we have `TodoApp` which consists of a `TodoList` and a `TodoForm`. Within the list we have several `TodoItem`s. Each of these components are visible to the user and they can interact with these components and perform actions.


### Passing Data into a Component

The `inputs` attribute defines a set of parameters that can be passed down from the component's parent. For example, we can modify the `HelloComponent` such that `name` can be configured by the parent.

``` js
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


### Responding to Component Events

Events in Angular 2 work similar to how they worked in Angular 1.x. The big change is template syntax.

```js
import {Component} from 'angular2/core';

@Component({
  selector: 'counter',
  template: `
    <div>
      <p>Count: {{ num }}</p>
      <button (click)="increment()">Increment</button>
    </div>
  `
})
export class Counter {
  num: number = 0;

  increment() {
    this.num++;
  }
}
```

[View Example](http://plnkr.co/edit/nUlNRowfoOI4XYhaPVOj?p=preview)


To send data out of components via outputs, start by defining the outputs attribute. It accepts a list of output parameters that a component exposes to its parent.

```js
import {Component, EventEmitter} from 'angular2/core';

@Component({
  selector: 'counter',
  inputs: ['count'],
  outputs: ['result'],
  template: `
    <div>
      <p>Count: {{ count }}</p>
      <button (click)="increment()">Increment</button>
    </div>
  `
})
export default class Counter {
  count: number = 0;
  result: EventEmitter = new EventEmitter();

  increment() {
    this.count++;
    this.result.emit(this.count);
  }
}
```

[View Example](http://plnkr.co/edit/bfAyfzYrncmMBGgulZsl?p=preview)


Together a set of input + output bindings define the public API of your component. In our templates we use the [squareBrackets] to pass inputs and the (parenthesis) handle outputs.


### Two-Way Data Binding

Two-way data binding combines the input and output binding into a single notation using the `ngModel` directive.

```js
<input [(ngModel)]="name" >
```


## Structural Directives

Angular's structural directives change the DOM layout by adding and removing DOM elements. For example:

```html
<div *ngIf="hero">{{ hero }}</div>

<div *ngFor="#hero of heroes">{{ hero }}</div>

<div [ngSwitch]="status">
  <template [ngSwitchWhen]="'in-mission'">In Mission</template>
  <template [ngSwitchWhen]="'ready'">Ready</template>
  <template ngSwitchDefault>Unknown</template>
</div>
```

#### The Asterisk (*) Syntax

The asterisk is syntactic sugar to make writing templates easier. Here is an example of the more verbose `<template>` syntax:

```html
<template [ngIf]="condition">
  <div>{{ hero }}</div>
</template>
```


#### Iteration with `ngFor`

When we have a list of items, we can use the `ngFor` directive within our component's template to create identical DOM element for each item. It can be used in a few different ways, for example:

- `<li *ngFor="#item of items; #i = index">...</li>`
- `<li template="ngFor #item of items; #i = index">...</li>`
- `<template ngFor #item [ngForOf]="items" #i="index"><li>...</li></template>`

[View Example](http://plnkr.co/edit/afIb8ldLVD7F0PbDueri?p=preview)


**Change Propagation**

> Angular uses object identity to track insertions and deletions within the iterator and reproduce those changes in the DOM.

> It is possible for the identities of elements in the iterator to change while the data does not.

For example, consider that the list is being generated based on a HTTP response. And then after some action you execute the HTTP request again and regenerate the list. Now even though the data has not changed the second iteration will produce objects with different identities. This causes Angular to tear down the entire DOM and rebuild it (as if all old elements were deleted and all new elements inserted).

We will delve deeper into this concept and how to optimize change propagation in later sections.


## Projection

Components by default support projection. You can use the `ngContent` directive to place the projected content.

```js
import {Component, Input} from 'angular2/core';

@Component({
  selector: 'child',
  template: `
    <h4>Child Component</h4>
    <ng-content></ng-content>
  `
})
class Child {}
```

[View Example](http://plnkr.co/edit/sW496q7hxco1BA6RAMD0?p=preview)


## Structuring Applications with Components

As the complexity and size of our application grows we want to divide responsibilities among our components further.

**Smart Components:** which are application specific, higher-level, container components, with access to the application's domain model.

**Dumb Components:** which are components responsible for UI rendering and/or behaviour of specific entities passed in via components API (i.e component properties and events). Those components are more in-line with the upcoming Web Component standards.
