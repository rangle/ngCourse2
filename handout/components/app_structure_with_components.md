# Application Structure with Components

A useful way of conceptualizing Angular application design is to look at it as a tree of nested components, 
each having an isolated scope.

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

At the root we have `TodoApp` which consists of a `TodoList` and a `TodoForm`. Within the list we have several `TodoItem`s. Each of these components is visible to the user, who can interact with these components and perform actions.

