# Using Other Components

Components depend on other components, directives and pipes. For example, `TodoListComponent` relies on `TodoItemComponent`. To let a component know about these dependencies we group them into a module.

```ts
import {NgModule} from '@angular/core';

import {TodoListComponent} from './components/todo-list.component';
import {TodoItemComponent} from './components/todo-item.component';
import {TodoInputComponent} from './components/todo-input.component';

@NgModule({
  imports: [ ... ],
  declarations: [
    TodoListComponent,
    TodoItemComponent,
    TodoInputComponent
  ],
  bootstrap: [ ... ]
})
export class ToDoAppModule {
}
```

The property `declarations` expects an array of components, directives and pipes that are part of the module.

Please see the [Modules section](../modules/README.md) for more info about `NgModule`.
