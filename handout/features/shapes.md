# Shapes

Underneath TypeScript is JavaScript, and underneath JavaScript is typically a
JIT (just in time compiler). Given JavaScript's underlying semantics, types
are typically reasoned about by "shapes".  These underlying "shapes" work like
TypeScript's interfaces, and are in fact _how_ TypeScript compares custom types
like `class`es, and `interface`s.

Consider an expansion of the previous example:

```ts

interface Action {
  type: string;
}

let a: Action = {
    type: 'literal' 
}

class NotAnAction {
  type: string;
  constructor() {
    this.type = 'Constructor function (class)';
  }
}

a = new NotAnAction(); // valid TypeScript!

```

Despite the fact that `Action`, and `NotAnAction` have different identifiers,
`tsc` lets us assign and instance of `NotAnAction` to `a` which has a type of
`Action`.  This is because TypeScript only really cares that Objects have the
same "shape".  In other words if two objects have the same attributes, with the
same typings, those two objects are considered to be of the same type.