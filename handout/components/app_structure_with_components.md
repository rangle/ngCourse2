# Application Structure with Components

A useful way of conceptualizing Angular application design is to look at it as a tree of nested components, 
each having an isolated scope.

For example consider the following:

```html
<rio-todo-app>
  <rio-todo-list>
    <rio-todo-item></rio-todo-item>
    <rio-todo-item></rio-todo-item>
    <rio-todo-item></rio-todo-item>
  </rio-todo-list>
  <rio-todo-form></rio-todo-form>
</rio-todo-app>
```

At the root we have `rio-todo-app` which consists of a `rio-todo-list` and a `rio-todo-form`. Within the list we have several `rio-todo-item`s. Each of these components is visible to the user, who can interact with these components and perform actions.

