# Using Other Components

Components depend on other components, directives and pipes. For example, `TodoList` relies on `TodoItem`. To let a component know about these dependencies we group them into a module.

```js
import {NgModule} from '@angular/core';
import {TodoInput} from './components/todo-input';
import {TodoItem} from './components/todo-item';
import {TodoList} from './components/todo-list';

@NgModule({
  imports: [ ... ],
  declarations: [ TodoList, TodoItem, TodoInput ],
  bootstrap: [ ... ]
})
export class ToDoAppModule { }
```

The property `declarations` expects an array of components, directives and pipes that are part of the module.

Please see the [Modules section](../modules/README.md) for more info about `NgModule`.
