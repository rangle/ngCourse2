# Injection Beyond Classes

So far the only types that injection has been used for have been classes, but  
Angular 2 is not limited to injecting classes.  The concept of `providers` was
also briefly touched upon.

So far `providers` have been used with Angular 2's `@NgModule` meta in an
array.  `providers` have also all been class identifiers.  Angular 2 lets
programmers specify providers with a more verbose "recipe". This is done with
by providing Angular 2 an Object literal (`{}`):

```js
import { NgModule } from '@angular/core';
import { App } from './containers/app'; // hypothetical app component
import { Hamburger } from './services/hamburger';

@NgModule({
  providers: [ { provide: Hamburger, useClass: Hamburger } ],
})
export class DiExample {};

```

This example is yet another example that `provide`s a class, but it does so with
Angular 2's longer format.

This long format is really handy.  If the programmer wanted to switch out
`Hamburger` implementations, for example to allow for a `DoubleHamburger`, they could
do this easily:

```js
import { NgModule } from '@angular/core';
import { App } from './containers/app'; // hypothetical app component
import {Hamburger} from './services/hamburger';
import {DoubleHamburger} from './services/double-hamburger';

@NgModule({
  providers: [ { provide: Hamburger, useClass: DoubleHamburger } ],
})
export class DiExample {};

```

The best part of this implementation swap is that the injection system knows
how to build `DoubleHamburgers`, and will sort all of that out.


The injector can use more than classes though.  `useValue` and `useFactory` are
two other examples of `provider` "recipes" that Angular 2 can use.  For example:

```js
import { NgModule } from '@angular/core';
import { App } from './containers/app'; // hypothetical app component

const randomFactory = () => { return Math.random(); };

@NgModule({
  providers: [ { provide: 'Random', useFactory: randomFactory } ],
})
export class DiExample {};

```

In the hypothetical app component, 'Random' could be injected like:

```js
import { Component, Inject, provide } from '@angular/core';
import { Hamburger } from '../services/hamburger';

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
function and in the consumer.  This is because as a factory we have no `Random`
identifier anywhere to access.

The above example uses Angular 2's `useFactory` recipe.  When Angular 2 is told
to `provide` things using `useFactory`, Angular 2 expects the provided value to be
a function. Sometimes functions and classes are even more than what's needed.
Angular 2 has a "recipe" called `useValue` for these cases that works almost
exactly the same:

```js
import { NgModule } from '@angular/core';
import { App } from './containers/app'; // hypothetical app component

@NgModule({
  providers: [ { provide: 'Random', useValue: Math.random() } ],
})
export class DiExample {};

```

[View Example][plunkRandom2]

In this case, the product of `Math.random` is assigned to the `useValue`
property passed to the `provider`.  


[plunkRandom1]: http://plnkr.co/edit/Dkm0cJF80EdmPcWZx45W?p=preview "Random DI 1"
[plunkRandom2]: http://plnkr.co/edit/63GsCDOElY7J8LNAbTjL?p=preview "Random DI 2"
