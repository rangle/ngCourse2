# Angular 2's DI

The last example introduced a hypothetical `Injector` object.  Angular 2
simplifies DI even further.  With Angular 2, developers almost never have to get
bogged down with injection details.

Angular 2's DI system is very subtle.  It's not obvious, but calling Angular 2's
bootstrap function initializes Angular 2's injection framework.

For example:

```js

import {bootstrap} from 'angular2/platform/browser';
import {App} from './path/to/your/root/component';

bootstrap(App)
```

Believe it or not, the above example creates the root injector.  This example is
too primitive though, the injector is not told about anything.

```js
import {bootstrap} from 'angular2/platform/browser';
import {Injectable} from 'angular2/core';
import {App} from './path/to/your/root/component';

@Injectable()
class Hamburger {
  constructor(private bun: Bun, private patty: Patty,
    private toppings: Toppings) {}
}

bootstrap(App, [Hamburger]);
```

In the above example the root injector is initialized, and told about the
`Hamburger` class.  Another way of saying this, is that Angular 2 has been
_provided_ a `Hamburger`.

That seems pretty straightforward, but astute readers will be wondering how
Angular 2 knows how to build `Hamburger`.  What if `Hamburger` was a string, or
a plain function?

Angular 2 _assumes_ that it's being given a class.

What about `Bun`, `Patty`, and `Toppings`, how is `Hamburger` getting those?

It's not, at least not yet.  Angular 2 does not know about them yet.  That can
be changed easily enough:

```js
import {bootstrap} from 'angular2/platform/browser';
import {Injectable} from 'angular2/core';
import {App} from './path/to/your/root/component';

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

// provide injectables to Angular 2
bootstrap(App, [Hamburger, Patty, Bun, Toppings]);
```

Okay, this is starting to look a little bit more complete.  The key take away
here is `bootstrap(App, [Hamburger, Patty, Bun, Toppings])`.  The second
parameter is an array of `providers`.

Although it's still unclear how `Hamburger` is being told about its
dependencies.  Perhaps that is related to those odd `@Injectable` statements.
