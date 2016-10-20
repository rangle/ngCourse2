# DI Framework

So there's a fancy new `Hamburger` class that is easy to test, but it's
currently awkward to work with.  Instantiating a `Hamburger` requires:

```js
const hamburger = new Hamburger(new Bun(), new Patty('beef'), new Toppings([]));
```

That's a lot of work to create a `Hamburger`, and now all the different pieces
of code that make `Hamburger`s have to understand how `Bun`, `Patty` and
`Toppings` get instantiated.

One approach to dealing with this new problem might be to make a factory
function like so:

```js
function makeHamburger() {
    const bun = new Bun();
    const patty = new Patty('beef');
    const toppings = new Toppings(['lettuce', 'tomato', 'pickles']);
    return new Hamburger(bun, patty, toppings);
}
```

This is an improvement, but when more complex `Hamburger`s need to be created
this factory will become confusing.  The factory is also responsible for
knowing how to create four different components.  This is a lot for one
function.

This is where a dependency injection framework can help.  DI Frameworks
have the concept of an `Injector` object.  An Injector is a lot like
the factory function above, but more general, and powerful.  Instead of one
giant factory function, an Injector has a factory, or _recipe_ (pun intended)
for a collection of objects.  With an `Injector`, creating a `Hamburger` could be
as easy as:

```js
const injector = new Injector([Hamburger, Bun, Patty, Toppings]);
const burger = injector.get(Hamburger);
```
