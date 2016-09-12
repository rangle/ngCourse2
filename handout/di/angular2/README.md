# Angular 2's DI

The last example introduced a hypothetical `Injector` object.  Angular 2
simplifies DI even further.  With Angular 2, programmers almost never have to get
bogged down with injection details.

Angular 2's DI system is (mostly) controlled through `@NgModule`s.  Specifically
the `providers`' array.

For example:

```js
import { Injectable, NgModule } from '@angular/core';

@Injectable()
class Hamburger {
  constructor(private bun: Bun, private patty: Patty,
    private toppings: Toppings) {}
}

@NgModule({
  providers: [ Hamburger ],
})
export class DiExample {};
```

In the above example the `DiExample` module is told about the `Hamburger` class.  
Another way of saying this is that Angular 2 has been _provided_ a `Hamburger`.

That seems pretty straightforward, but astute readers will be wondering how
Angular 2 knows how to build `Hamburger`.  What if `Hamburger` was a string, or
a plain function?

Angular 2 _assumes_ that it's being given a class.

What about `Bun`, `Patty` and `Toppings`? How is `Hamburger` getting those?

It's not, at least not yet.  Angular 2 does not know about them yet.  That can
be changed easily enough:

```js
import { Injectable, NgModule } from '@angular/core';

@Injectable()
class Hamburger {
  constructor(private bun: Bun, private patty: Patty,
    private toppings: Toppings) {}
}

@Injectable()
class Patty {}

@Injectable()
class Bun {}

@Injectable()
class Toppings {}

@NgModule({
  providers: [ Hamburger, Patty, Bun, Toppings ],
})
```

Okay, this is starting to look a little bit more complete. Although it's still
unclear how `Hamburger` is being told about its dependencies.  Perhaps that is
related to those odd `@Injectable` statements.
