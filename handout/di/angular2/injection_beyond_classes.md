# Injection, Beyond Classes

So far the only types that injection has been used for have been classes.  
Angular 2 is _not_ limited to injecting classes.  The concept of `providers` was
also briefly touched upon.

So far `providers` have been passed to Angular 2's `bootstrap` function in an
array.  `providers` have also all been class identifiers.  Angular 2 lets
developers specify providers with a more verbose "recipe". This is done with
Angular 2's `provide` function, like so:

```js

import {App} from './containers/app'; // hypothetical app component
import {Hamburger} from './services/hamburger'; 
import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';

bootstrap(App, [provide(Hamburger, { useClass: Hamburger })]);

```

This example is yet another example that `provides` a class, but it does so with
Angular 2's longer format.  The second parameter to the `provide` function lets
developers "use" things other than classes for dependency injection.

This long format is really handy.  If the developer wanted to switch out
`Hamburger` implementations, to allow for say a `DoubleHamburger` they could
do this easily:

```js

import {App} from './containers/app'; // hypothetical app component
import {DoubleHamburger} from './services/double-hamburger'; 
import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';

bootstrap(App, [provide(Hamburger, { useClass: DoubleHamburger })]);

```

The best part of this implementation swap is that the injection system _knows_
how to build `DoubleHamburgers`, and will sort out all of that out. 


The injector can use more than classes though.  `useValue`, and `useFactory` are
two other examples of `provider` "recipes" that Angular 2 can use.  For example:

```js

import {App} from './containers/app'; // hypothetical app component
import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';

const randomFactory = () => { return Math.random(); };
const randomDefinition = { useFactory: randomFactory };

bootstrap(App, [provide('Random', randomDefinition)]);

```

In the hypothetical app component, 'Random' could be injected like:

```js

import {Component, Inject, provide} from 'angular2/core';
import {Hamburger} from '../services/hamburger';

@Component({
  selector: 'app',
  template: `Random: {{ value }}`
})
export class App {
  value: number;
  constructor(@Inject('Random') r) {
    this.value = r;
  }
}
```
[View Example][plunkRandom1]

One important note is that 'Random' is in quotes, both in the `provide` 
function, and in the consumer.  This is because as a factory we have no `Random`
identifier anywhere to access.

The above example uses Angular 2's `useFactory` recipe.  When Angular 2 is told
to `provide` things using `useFactory` Angular 2 expect the provided value to be
a function.  Sometimes functions, and classes are even more than what's needed.
Angular 2 has a "recipe" called `useValue` for these cases, it works almost
exactly the same:

```js

import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {App} from './containers/app';

const randomDefinition = { useValue: Math.random() };

bootstrap(App, [provide('Random', randomDefinition)]);
```

[View Example][plunkRandom2]

In this case, the product of `Math.random` is assigned to the `useValue` 
property passed to the `provider`.  


[plunkRandom1]: https://plnkr.co/edit/FOcTlh2o37RdNVyxlTxk?p=preview "Random DI 1"
[plunkRandom2]: https://plnkr.co/edit/BV7r4FpkVtLMbbgFaBvj?p=preview "Random DI 2"
