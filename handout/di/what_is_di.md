# What is DI?

So dependency injection makes programmers' lives easier, but what does it
_really_ do?

Consider the following code:

```js
class Hamburger {
  private bun: Bun;
  private patty: Patty;
  private toppings: Toppings;
  constructor() {
    this.bun = new Bun('withSesameSeeds');
    this.patty = new Patty('beef');
    this.toppings = new Toppings(['lettuce', 'pickle', 'tomato']);
  }
}

```

The above code is a contrived class that represents a hamburger.  The class
assumes a `Hamburger` consists of a `Bun`, `Patty`, and `Toppings`.  The class 
is also responsible for _making_ the `Bun`, `Patty`, and `Toppings`.  This is a 
bad thing. What if a vegetarian burger were needed?  One naive approach might 
be:

```js
class VeggieHamburger {
  private bun: Bun;
  private patty: Patty;
  private toppings: Toppings;
  constructor() {
    this.bun = new Bun('withSesameSeeds');
    this.patty = new Patty('tofu');
    this.toppings = new Toppings(['lettuce', 'pickle', 'tomato']);
  }
}
```

There, problem solved right? But what if we need a gluten free hamburger? 
What if we want different toppings... maybe something more generic like:

```js
class Hamburger {
  private bun: Bun;
  private patty: Patty;
  private toppings: Toppings;
  constructor(bunType: string, pattyType: string, toppings: string[]) {
    this.bun = new Bun(bunType);
    this.patty = new Patty(pattyType);
    this.toppings = new Toppings(toppings);
  }
}
```

Okay this is a little different, and it's more flexible in some ways, but it is
still quite brittle.  What would happen if the `Patty` constructor changed to
allow for new features?  The whole `Hamburger` class would have to be updated.
In fact, any time any of these constructors used in `Hamburger`'s constructor
are changed, `Hamburger` would also have to be changed.

Also, what happens during testing? How can `Bun`, `Patty`, and `Toppings` be
effectively mocked?

Taking those concerns into consideration, the class could be rewritten as:

```js
class Hamburger {
  private bun: Bun;
  private patty: Patty;
  private toppings: Toppings;
  constructor(bun: Bun, patty: Patty, toppings: Toppings) {
    this.bun = bun;
    this.patty = patty;
    this.toppings = toppings;
  }
}
```

Now when `Hamburger` is instantiated it does not need to know anything about its
`Bun`, `Patty`, or `Toppings`.  The construction of these elements has been
moved out of the class.  This pattern is so common that TypeScript allows it to
be written in shorthand like so:

```js
class Hamburger {
  constructor(private bun: Bun, private patty: Patty, 
    private toppings: Toppings) {}
}
```


The `Hamburger` class is now simpler, and easier to test.  This model of having
the dependencies provided to `Hamburger` is basic dependency injection.

However there is still a problem.  How can the instantiation of `Bun`, 
`Patty`, and `Toppings` best be managed?

This is where dependency injection as a _framework_ can benefit programmers, and
it is what Angular 2 provides with its dependency injection system.

