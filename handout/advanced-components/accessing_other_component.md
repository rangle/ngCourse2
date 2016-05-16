# Accessing Other Components

Components depend on other components. For example, `TodoList` relies on `TodoItem`. To let a component know about the dependent components we use the directive attribute.

```js
import {Component} from '@angular/core';
import {TodoInput} from './components/todo-input';
import {TodoList} from './components/todo-list';

@Component({
  selector: 'todo-app',
  directives: [TodoInput, TodoList],
  template: `...`
})
export class TodoApp {}
```

The same idea applies to `pipes`.
