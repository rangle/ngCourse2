# Change Detection Strategies in Angular 1 vs Angular 2

Another difference between both versions of the framework is the way the nodes of an application (directives or components) are checked to see if the DOM needs to be updated.

Because of the nature of two-way data binding, in Angular 1 there was no guarantee that a parent node would always be checked before a child node. It was possible that a child node could change a parent node or a sibling or any other node in the tree, and that in turn would trigger new updates down the chain. This made it difficult for the change detection mechanism to traverse all the nodes without falling in a circular loop with the infamous message:

```
10 $digest() iterations reached. Aborting!
```

In Angular 2, changes are guaranteed to propagate unidirectionally. The change detector will **traverse each node only once**, always starting from the root. That means that a parent component is always checked before its children components.

_Tree traversing in Angular 1 vs Angular 2_

![File Structure](../images/angular1-vs-angular2.jpg)
