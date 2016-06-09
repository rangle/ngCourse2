# Interfaces

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

```js
interface Callback {
  (error: Error, data: any): void;
}

function callServer(callback: Callback) {
  callback(null, 'hi');
}
callServer((error, data) => console.log(data)); // 'hi'
callServer('hi');                               // tsc error
```

Sometimes JavaScript functions are "overloaded", that is, they _can_ have
different call signatures.  Interfaces can be used to specify this.  (Methods
in classes can also be overloaded):

```js
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

```js

interface Action {
  type: string;
}

let a: Action = {
    type: 'literal' 
}

```