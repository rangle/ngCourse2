# Part 1: EcmaScript 6 and TypeScript Features #

The new version of JavaScript, "EcmaScript 6" or "ES6", offers a number of new features that extend the power of the language. (The language we usually call "JavaScript" is actually formally known as "EcmaScript".) ES6 is not widely supported in today's browsers, so it needs to be transpiled to ES5. You can choose between several transpilers, but we'll be using TypeScript, which is what the Angular team users to write Angular 2. Angular 2 makes use of a number of features of ES6 and TypeScript.

## ES6

During a ten day stretch in the nineteen ninties, JavaScript was written by
Brendan Eich. Twenty plus years later, and the language is thriving.  There are
subsets, supersets, current versions, and an upcoming version.  ES6 is that
upcoming version, and it brings a lot of new features.

Some of the highlights:

- Classes
- Arrow Functions
- Constants, and Block Scoped Variables
- ...spread, and ...rest
- Destructuring
- Modules


### Classes

Classes are a way of describing the blueprint of an object, they are a new
feature in ES6, and make EcmaScript's prototypical inheritance model function 
more like a traditional class based language.  

```js
class Hamburger {
  constructor() {
    // This is the constructor.
  }
  listToppings() {
    // This is a method.
  }
}
```

Traditional class based languages often reserve the word `this` to reference the
current (runtime) instance of the class.  This is also true in JavaScript, _but_
JavaScript code can _optionally_ supply `this` to a method at call time.


### A Refresher on `this`

Inside a JavaScript class we'll be using `this` keyword to refer to the instance of the class. E.g., consider this case:

```ts
class Toppings {
  ...
  formatToppings() { /* implementation details */ }
  list() {
    return this.formatToppings(this.toppings);
  }
}
```

Here `this` refers to the instance of the class, assuming that a `list` method is called using the dot notation, such as `myToppings.list()`. In this case, `this.formatToppings(this.toppings)` invokes the `formatToppings()` method defined on the instance of the class. This will also ensure that inside `formatList` we'll also have `this` referring to the same instance.

However, `this` can also refer to other things. This can get very confusing.

There are two basic cases that you would want to remember.

The first is "method invocation":

```ts
  someObject.someMethod();
```

Here `this` used inside `someMethod` will refer to `someObject`. This is usually what you want.

The second case is "function invocation":


```ts
  someFunction();
```

Here `this` used inside `someFunction` can refer to different things depending on whether we are in "strict" mode or not. Without using the "strict" mode, `this` refers to the context in which `someFunction()` was called. This is rarely what you want, and it can be extremely confusing. In strict mode, `this` would be `undefined`, which is slightly less confusing.

One of the implications of this is that you cannot easily detach a method from its object. E.g., consider this example:

```ts
  var log = console.log;
  log('Hello');
```

In many browsers this will give you an error. That's because `log` expects `this` to refer to `console`, but this reference is lost when you detach it from `console`.

This can be fixed by specifying this explicitly. One way to do this is by using `bind()` method, which fixes the function's this to a particular value.

```ts
  var log = console.log.bind(console);
  log('Hello');
```

You can also achieve the same using `Function.call` and `Function.apply`, but we won't discuss this here.

Another instance where `this` can be confusing is with respect to anonymous
functions, or functions declared within other functions.  Consider the 
following:

```js
class ServerRequest {
   notify() {
     ...
   }
   fetch() {
     getFromServer(function callback(err, data) {
        this.notify(); // this is not going to be work
     });
   }
}
```

In the above case `this` will _not_ point to the expected object, in "strict"
mode it will be `undefined`.  THis leads to another ES6 feature...

### Arrow Functions

ES6 offers some new syntax for dealing with `this` madness: "arrow functions".

The new "fat arrow" notation can be used to define anonymous functions in a simpler way.

Consider the following example:

```ts
  items.forEach(function(x) {
    console.log(x);
    incrementedItems.push(x+1);
  });
```

This can be rewritten as an "arrow function" using the following syntax:

```ts
  items.forEach((x) => {
    console.log(x);
    incrementedItems.push(x+1);
  });
```

Functions that calculate a single expression and return its values can be defined even simpler:

```ts
  incrementedItems = items.map((x) => x+1);
```

The latter is _almost_ equivalent to the following:

```ts
  incrementedItems = items.map(function (x) {
    return x+1;
  });
```

There is one important difference, however: arrow functions share the value of `this` with the function in the context of which they are defined. Consider the following example:

```ts
class Toppings {
  constructor(toppings) {
    this.toppings = Array.isArray(toppings) ? toppings : [];
  }
  outputList() {
    this.toppings.forEach(function(topping, i) {
      console.log(topping, i + '/' + this.toppings.length);  // no this
    })
  }
}

var ctrl = new Toppings(['cheese', 'lettuce']);

ctrl.outputList();
```

Let's try this code on ES6 Fiddle ([http://www.es6fiddle.net/](http://www.es6fiddle.net/)). As we see, this gives us an error, since `this` is undefined inside the anonymous function.

Now, let's change the method to use the arrow function:

```ts
class Toppings {
  constructor(toppings) {
    this.toppings = Array.isArray(toppings) ? toppings : [];
  }
  outputList() {
    this.toppings
      .forEach((topping, i) => console
        .log(topping, i + '/' + this.toppings.length);  // `this` works! 
    )
  }
}

var ctrl = new Toppings(['cheese', 'lettuce']);
```

Here `this` inside the arrow function refers to the instance variable.

*Warning* arrow functions do _not_ have their own `arguments` variable, this
can be confusing to veteran JavaScript programmers. `super`, and `new.target`
are also scoped from the outer enclosure.

### Inheritance

JavaScript's inheritance works differently from inheritance in other languages, which can be very confusing. ES6 classes provide a syntactic sugar attempting to alleviate the issues with using prototypical inheritance present in ES5. Our recommendation is still to avoid using inheritance or at least deep inheritance hierarchies. Try solving the same problems through delegation instead.

### Constants, and Block Scoped Variables

ES6 introduces the concept of block scoping.  Block scoping will be familiar to
programmers from other languages like C, Java, or even PHP.  In ES5 JavaScript,
and earlier `var`s are scoped to `function`s, and they can "see" outside their
functions to the outer context.

```js
var five = 5;
var threeAlso = three; // error

function scope1() {
  var three = 3;
  var fiveAlso = five; // == 5
  var sevenALso = seven; // error
}

function scopt2() {
  var seven = 7;
  var fiveAlso = five; // == 5
  var threeAlso = three; // error
}
```

In ES5 functions were essentially containers that could be "seen" out of, but
not into.

In ES6 `var` still works that way, using functions as containers, but there are
two new ways to declare variables: `const`, and `let`.  `const`, and `let` use
`{`, and `}` blocks as containers, hence "block scope". 

Block scoping is most useful during loops.  Consider the following:

```js
var i;
for (i = 0; i < 10; i += 1) {
  var j = i;
  let k = i;
}
console.log(j); // 9
console.log(k); // undefined
```

Despite the introduction of block scoping, functions are still _the_ preferred
mechanism for dealing with most loops.

`let` works like `var` in the sense that its data is read/write. Alternatively,
`const` is read only.  Once `const` has been assigned, the identifier can not be
re-assigned, the value is [not immutable][mdnConst].

For example:

```js
const myName = 'pat';
let yourName = 'jo';

yourName = 'sam'; // assigns
myName = 'jan';   // error
```

The read only nature can be demonstrated with any object:

```js
const literal = {};

literal.attribute = 'test'; // fine
literal = []; // error;
```

### ...spread, and ...rest

Spread takes a collection of something, like `[]`s or `{}`s, and applies them to
something else that accepts `,` separated arguments, like `function`s, `[]`s,
and `{}`s.

For example:

```js

const add = (a, b) => a + b;
let args = [3, 5];
add(...args); // same as `add(args[0], args[1])`, or `add.apply(null, args)`
```

Functions aren't the only place in JavaScript that makes use of comman separated
lists. `[]`s can now be concatenated with ease:

```js
let cde = ['c', 'd', 'e'];
let scale = ['a', 'b', ...cde, 'f', 'g']; // ['a', 'b', 'c', 'd', 'e', 'f', 'g']
```

Similarly, object literals can do the same thing:

```js
let mapABC  = { a: 5, b: 6, c: 3};
let mapABCD = { ...mapABC, d: 7}; // { a: 5, b: 6, c: 3, d: 7 }
```

...rest arguments share the ellipsis like syntax of rest operators but are used
for a different purpose.  ...rest arguments are used to access a variable number
of arguments passed to a function.

For example:

```js
function addSimple(a, b) {
  return a + b;
}

function add(...numbers) {
  return numbers[0] + numbers[1];`
}

addSimple(3, 2);  // 5
add(3, 2);        // 5

// or in es6 style:
const addEs6 = (...numbers) => numbers.reduce((p, c) => p + c, 0);

addEs6(1, 2, 3);  // 6
```

Technically JavaScript already had an `arguments` variable set on each function
(except for arrow functions), however `arguments` has a lot of issues, one of
which is the fact that it is not technically an array.

...rest arguments are in fact arrays.  The other important difference is that
rest arguments only include arguments not specifically named in a function
like so:

```js

function print(a, b, c, ...more) {
  console.log(...more[0]);
  console.log(arguments[0]);
}

print(1, 2, 3, 4, 5); 
// 4
// 1

```

### Destructuring

Destructuring is a way to quickly extract data out of an `{}` or `[]` without
having to write much code.

To [borrow from the MDN][mdnDest], destructuring can be used to turn the
following:
 
```js
let foo = ['one', 'two', 'three'];

let one   = foo[0];
let two   = foo[1];
let three = foo[2];
```

into

```js
let foo = ['one', 'two', 'three'];
let [one, two, three] = foo;
console.log(one); // 'one'
```

This is pretty interesting, but at first it might be hard to see the use case.
ES6 also supports Object destructuring, which might make uses more obvious:

```js
let myModule = {
  drawSquare: function drawSquare(length) { /* implementation */ },
  drawCircle: function drawSquare(radius) { /* implementation */ },
  drawText: function drawSquare(text) { /* implementation */ },
};

let {drawSquare, drawText} = myModule;

drawSquare(5);
drawText('hello');
```

There are _many_ more sophisticated things that can be done with destructuring,
and the [mdn][mdnDest] has some great examples, including nested Object
destructuring, and dynamic destructing during for-ins iterators.


## ES6 Modules

ES6 also introduces the concept of a module, which works in a similar way to other languages. Defining an ES6 module is quite easy: each file is assumed to define a module and we'll specify it's exported values using the `export` keyword. Loading ES6 modules is a little trickier.

In a ES6 compliant browser you would be using the `System` keyword to load modules asynchronously. To make our code work with the browsers of today, however, we will use SystemJS library as a polyfill:

```html
  <script src="/node_module/systemjs/dist/system.js"></script>
  <script>
    var promise = System.import('app')
      .then(function() {
        console.log('Loaded!');
      })
      .then(null, function(error) {
        console.error('Failed to load:', error);
      });
  </script>
```


## Additional ES6 Features

In addition to classes and arrow functions, ES6 offers numerous other features not available in ES5. Most of those are currently supported by TypeScript. We won't discuss those features here, though we will come across some of them in the course. We encourage you to learn more about them on your own, however. This repository provides a good overview: [https://github.com/lukehoban/es6features](https://github.com/lukehoban/es6features).


## TypeScript

ES6 is the upcoming version of JavaScript.  TypeScript is a superset of ES6,
which means all ES6 features are part of TypeScript, but not all TypeScript
features are part of ES6.  Consequently, TypeScript must be transpiled into ES5
to run in most browsers.

One of TypeScript's primary features is the addition of type information, hence
the name.  This type information can help make JavaScript programs more
predictable, and easier to reason about. 

Types let programmers write more explicit "contracts", in other words, things 
like function signatures are more explicit.  This is true for both humans, and 
the TypeScript compiler.

Without TS:

```js

function add(a, b) {
  return a + b;
}

add(1, 3);   // 4
add(1, '3'); // '13'
```

With TS:

```js

function add(a: number, b: number) {
  return a + b;
}

add(1, 3);   // 4
// compiler error before JS is even produced
add(1, '3'); // '13'

```

### Getting Started With TypeScript


We can install the TypeScript transpiler using npm:

```bash
  npm install -g typescript
```

We can then use `tsc` to manually compile a TypeScript source file into ES5:

```bash
  tsc test.ts
  node test.js
```

#### Note About ES6 Examples

Our earlier ES6 class won't compile now, however. TypeScript is more demanding than ES6 and it expects instance properties to be declared:

```ts
  class Toppings {
    toppings: string[];
    constructor(toppings: string[]) {
      this.toppings = toppings';
    }
  }
```

Note that now that we've declared `toppings` to be an array of strings, TypeScript will enforce this. If we try to assign a number to it, we will get an error at compilation time.

If you want to have a property that can be set to a value of any type, however, you can still do this: just declare its type to be "any":

```ts
  class Toppings {
    toppings: any;
    ...
  }
```

#### Working With tsc

So far `tsc` has been used to compile a single file.  Typically developers have
a _lot_ more than one file to compile.  `tsc` can handle multiple files as
arguments.

Imagine two ultra simple files/modules:

a.ts
```js
export const A = (a) => console.log(a);
```

b.ts
```js
export const B = (b) => console.log(b);
```

```bash
tsc ./a.ts ./b.ts 
a.ts(1,1): error TS1148: Cannot compile modules unless the '--module' flag is provided.
```

Hmmm.  What's the deal with this module flag? TypeScript has a help menu, lets
take a look:

```bash
tsc --help | grep module
 -m KIND, --module KIND             Specify module code generation: 'commonjs', 'amd', 'system', 'umd' or 'es6'
 --moduleResolution                 Specifies module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6).
 
```

TypeScript has more help than just what's shown, TypeScript's output has been
filtered by `grep` for brevity.  There are two help entries that reference
"module", and `--module` is the one TypeScript was complaining about.

The description explains that TypeScript supports a number of different module
schemes.  For the moment `commonjs` is desirable.  This will produce modules
that are compatible with node.js's module system.

```bash
tsc -m commonjs ./a.ts ./b.ts
```

Should now produce no output.  In many command line traditions no output is
actually a mark of success.  Listing the directory contents will confirm this:

```bash
ls
a.js	a.ts	b.js	b.ts
```

Excellent there are now two JavaScript modules ready for consumption

Telling the `tsc` command what to compile becomes tedious, and labour intensive
even on small projects.  Fortunately TypeScript has a means of simplifying this.
`tsconfig.json` files let developers write down all the compiler settings they
want.  When `tsc` is run, it looks for `tsconfig.json` files, and uses their
rules to compile JavaScript.

For Angular 2 projects there are a number of specific settings that need to be
configured in a project's `tsconfig.json`

```javascript
 {
   "compilerOptions": {
     "module": "commonjs",
     "target": "es5",
     "emitDecoratorMetadata": true,
     "experimentalDecorators": true,
     "noImplicitAny": false,
     "removeComments": false,
     "sourceMap": true
   },
   "exclude": [
     "node_modules",
     "dist/"
   ]
 }
```

#### Target

The compilation target. Typescript supports targeting different platforms depending on your needs. In our case, we're targeting modern browsers which support `es5`.

#### Module

The target module resolution interface. We're integrating TypeScript through webpack which supports different interfaces. We've decided to use node's module resolution interface, `commonjs`.

#### Decorators

Decorator support in TypeScript [hasn't been finalized yet](http://rbuckton.github.io/ReflectDecorators/typescript.html) but since Angular 2 uses decorators extensively, these need to be set to true.  Decorators have not been introduced yet, and will be covered later in this section.

#### TypeScript with Webpack

We won't be running `tsc` manually, however. Instead, Webpack's 'ts' loader will do the transpilation during the build:

```javascript
  // webpack.config.js
  ...
  loaders: [
    { test: /\.ts$/, loader: 'ts', exclude: /node_modules/ },
    ...
```

This loader calls TypeScript for us, and it will use our `tsconfig.json`


#### Typings

Astute readers might be wondering what happens when TypeScript programmers need
to interface with JavaScript modules that have no type information.  TypeScript
recognizes files labelled `*.d.ts` as _definition_ files.  These files are
meant to use TypeScript to describe interfaces presented by JavaScript 
libraries.

There are communities of people dedicated to creating typings for JavaScript
projects.  There is also a utility called `tsd` (`npm install --save-dev tsd`)
that can be used to manage third party typings.


#### Linting

Many editors support the concept of "linting".  Linting is basically grammar
check for computer programs.  Linting can be done in a programmer's editor,
and/or through automation.

For TypeScript there is a package called `tslint`, (`npm install --save-dev 
ts-lint`) which can be plugged into many editors.  `tslint` can also be 
configured with a `tslint.json` file.

Webpack can also run `tslint` _before_ it even attempts to run `tsc`.  This is
done by installing `tslint-loader` (`npm install --save-dev tslint-loader`)
which plugs into webpack like so:

```js
 ...
 module: {
    preLoaders: [{
      test: /\.ts$/,
      loader: 'tslint'
    }],
    loaders: [
      { test: /\.ts$/, loader: 'ts', exclude: /node_modules/ },
      ...
    ]
    ...
 }
```

### Typescript Features 

Now that producing JavaScript from TypeScript code has been de-mystified, two of
its features can be described, and experimented with.

- Types, Interfaces, and "Shapes"
- Decorators

#### Types, Interfaces, and "Shapes"

Many people do not realize it, but JavaScript _does_ in fact have types, they're
just "Duck Typed", which roughly means that the developer does not have to think
about them.  JavaScript's types also exist in TypeScript:

- `boolean` (true/false)
- `number` integers, floats, `Infinity`, and `NaN`
- `string` characters, and strings of characters
- `[]` Arrays of other types, like `number[]` or `boolean[]`
- `{}` Objects
- `undefined` not set

TypeScript also adds

- `enum` enumerations like `{ Red, Blue, Green }`
- `any` use any type
- `void` nothing

Basic type example:

```javascript
let isDone: boolean = false;
let height: number = 6;
let name: string = "bob";
let list:number[] = [1, 2, 3]; 
let list:Array<number> = [1, 2, 3];
enum Color {Red, Green, Blue};
let c: Color = Color.Green;
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

function showMessage(data: string): void {
    alert(data);
}
showMessage('hello');
```

This illustrates all of the basic types in TypeScript, and ends by illustrating
a `showMessage` function. In this function the parameters have specific types
that are checked when `tsc` is run.

In _many_ JavaScript functions it's quite common for functions to take optional
parameters. TypeScript provides support for this like so:

```js
function logMessage(message: string, isDebug?: boolean) {
  if (isDebug) {
    console.log('Debug: ' + message);
  } else {
    console.log(message);
  }
}
logMessage('hi');         // 'hi'
logMessage('test', true); // 'Debug: test'
```

Using a `:?` lets `tsc` know that `isDebug` is an optional parameter.  `tsc`
will _not_ complain if `isDebug` is omitted 


##### TypeScript classes

TypeScript also treats `class`es as their own type:

```js
class Foo { foo: number; }
class Bar { bar: string; }

class Baz { 
  constructor(foo: Foo, bar: Bar) { }
}

let baz = new Baz(new Foo(), new Bar()); // valid
baz = new Baz(new Bar(), new Foo());     // tsc errors
```

##### Interfaces

Sometimes classes are "more" than a developer wants.  Classes end up creating
code, in the form of transpiled ES6 classes, or transpiled ES5 constructor
functions.

Also, JavaScript is a _subset_ of TypeScript, and in JavaScript functions are
"first class" (they can be assigned to variables, and passed around) so how can
functions be described in TypeScript?

TypeScript's interfaces solve both of these problems.  Interfaces are abstract
descriptions of things.  Interfaces can be used to represent any non-primitive
JavaScript object.  Interfaces are literally "abstract" in the sense that they
produce no code, ES6, or ES5.  Interfaces exist only to describe types to `tsc`.

Here is an example of an interface describing a function:

```ts
interface Callback {
  (error: Error, data: any): void;
}

function callServer(callback: Callback) {
  callback(null, 'hi');
}
callServer((data) => console.log(data)); // 'hi'
callServer('hi');                        // tsc error
```

Sometimes JavaScript functions are "overloaded", that is, they _can_ have
different call signatures.  Interfaces can be used to specify this.  Methods
in classes can also be overloaded:

```ts
interface PrintOutput {
  (message: string): void;    // common case
  (message: string[]): void;  // less common case
}

let printOut: PrintOutput = (message) => {
  if (Array.isArray(message)) {
    console.log(message.join(', '));
  } else {
    console.log(message);
  }
}

printOut('hello');       // 'hello'
printOut(['hi', 'bye']); // 'hi, bye'

```

Here is an example of an interface describing an Object literal:

```ts

interface Action {
  type: string;
}

let a: Action = {
    type: 'literal' 
}

```

##### Shapes

Underneath TypeScript is JavaScript, and underneath JavaScript is typically a
C++ JIT (just in time compiler). Given JavaScript's underlying semantics, types
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

#### Decorators

Decorators are an existing proposal for a future version of JavaScript, but
the Angular 2 team _really_ wanted to use them, so they have been included in
TypeScript.

Decorators are functions that are invoked with a prefixed `@` symbol, and
_immediately_ followed by a `class`, a parameter, or a method.  The decorator
function is supplied information about the `class`, parameter, or method, and
the decorator function returns something in its place.  Typically the
"something" a decorator returns is the same thing that was passed in, it's just
been augmented in some way.

[mdnDest]:https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment "MDN Destructuring Assignment"
[mdnConst]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const "MDN const - const is not immutable"