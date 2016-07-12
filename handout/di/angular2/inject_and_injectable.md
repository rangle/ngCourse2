# `@Inject` and `@Injectable`

Statements that look like `@SomeName` are decorators.  [Decorators][decorators] 
are a proposed extension to JavaScript.  In short decorators let programmers 
modify and/or tag methods, classes, properties and parameters.  There is a lot
to decorators. In this section the focus will be on decorators relevant to DI:
`@Inject` and `@Injectable`.  For more information on Decorators
please see [the EcmaScript 6 and TypeScript Features section](../../features/README.md).

`@Inject()` is a _manual_ mechanism for letting Angular 2 know that a 
_parameter_ must be injected.  It can be used like so:
 
```js
  import {Component, Inject, provide} from '@angular/core';
 import {Hamburger} from '../services/hamburger';
 
 @Component({
   selector: 'app',
   template: `Bun Type: {{ bunType }}`
 })
 export class App {
   bunType: string;
   constructor(@Inject(Hamburger) h) {
     this.bunType = h.bun.type;
   }
 }

```
 
When using TypeScript, `@Inject` is only needed for injecting _primitives_.
TypeScript's types let Angular 2 know what to do in most cases.  The above
example would be simplified in TypeScript to:
 
```js
 import {Component, Inject, provide} from '@angular/core';
 import {Hamburger} from '../services/hamburger';
 
 @Component({
   selector: 'app',
   template: `Bun Type: {{ bunType }}`
 })
 export class App {
   bunType: string;
   constructor(h: Hamburger) {
     this.bunType = h.bun.type;
   }
 }

```
[View Example][plunkBurger1]


`@Injectable()` lets Angular 2 know that a _class_ can be used with the 
dependency injector.  `@Injectable()` is not _strictly_ required if the class 
has _other_ Angular 2 decorators on it.  What is important is that any class 
that is going to be injected with Angular 2 _is decorated_.  However best
practice is to decorate injectables with `@Injectable()`, as it makes more
sense to the reader.

Here's an example of `Hamburger` marked up with `@Injectable`:

```js
import {Injectable} from '@angular/core';
import {Bun} from './bun';
import {Patty} from './patty';
import {Toppings} from './toppings';

@Injectable()
export class Hamburger {
  constructor(public bun: Bun, public patty: Patty, public toppings: Toppings) {
  }
}
```

In the above example Angular 2's injector determines what to inject into
`Hamburger`'s constructor by using type information.  This is possible because
these particular dependencies are typed, and are _not primitive_ types.
In some cases Angular 2's DI needs more information than just types.


[decorators]: http://blog.wolksoftware.com/decorators-reflection-javascript-typescript "ES Decorators Explained"
[plunkBurger1]: https://plnkr.co/edit/Nl0Byirxj3RhbDVWCz3l "Hamburger DI Demo"
