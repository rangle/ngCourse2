<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Part 14: Advanced Components](#part-14-advanced-components)
  - [Component Lifecycle](#component-lifecycle)
  - [Accessing Other Component](#accessing-other-component)
  - [View Encapsulation](#view-encapsulation)
  - [ElementRef](#elementref)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Part 14: Advanced Components

## Component Lifecycle

A Component has a lifecycle managed by Angular itself. Angular manages creation, rendering, data-bound properties etc. It also offers hooks that allow us to respond to key lifecycle events.

Here is the complete lifecycle hook interface inventory:

- `ngOnChanges` - called when an input or output binding value changes
- `ngOnInit` - after the first `ngOnChanges`
- `ngDoCheck` - developer's custom change detection
- `ngAfterContentInit` - after component content initialized
- `ngAfterContentChecked` - after every check of component content
- `ngAfterViewInit` - after component's view(s) are initialized
- `ngAfterViewChecked` - after every check of a component's view(s)
- `ngOnDestroy` - just before the component is destroyed.

🔗 from [Component Lifecycle](https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html)

[View Example](http://plnkr.co/edit/0fuHvJn8SFm8sE0C33F0?p=preview)


## Accessing Other Component

Components depend on other components. For example, `TodoList` relies on `TodoItem`. To let a component know about the dependent components we use the directive attribute.

```js
import {Component} from 'angular2/core';
import TodoInput from 'components/todo-input';
import TodoList from 'components/todo-list';

@Component({
  selector: 'todo-app',
  directives: [TodoInput, TodoList],
  template: `...`
})
export class TodoApp {}
```

The same idea applies to `pipes`.


## View Encapsulation

Defines whether the template and styles defined within the component can affect the whole application or vice versa. Angular provides three encapsulation strategies:

- `Emulated`: (default) Styles from main HTML propagate to the component
- `Native`: Styles from main HTML do not propagate to the child
- `None`: Styles from the component propagate back to the main HTML

 ```js
@Component({
  ...
  encapsulation: ViewEncapsulation.None,
  styles: [ ... ]
})
export class Hello { ... }
 ```

[View Example](http://plnkr.co/edit/xTAqeN5jnf5KEFUARtAL?p=preview)


## ElementRef

Provides access to the underlying native element (DOM node).

```js
import {Component, ElementRef} from 'angular2/core';

@Component({
  selector: 'todo-app',
  template: `...`
})
export class TodoApp {

  constructor(
    private elementRef: ElementRef
  ) {
    const container = this.elementRef.nativeElement;
  }

}
```


[View Example](http://plnkr.co/edit/QkNbKQh6ya1WX0YdUahX?p=preview)
