# Interfaces

An _interface_ is a TypeScript artifact, it is not part of ECMAScript. A _interface_ is a way to define a _contract_ on a function with respect to the arguments and their type. Along with functions, an _interface_ can also be used with a Class as well define user defined types.

An interface is an abstract type, it does not contain any code as a _class_ does. It's only defines the 'signature' or shape of an API. During the translation stage a TypeScript interface will not generate any code, it only used only by TypeScript for type checking.

Here is an example of an interface describing a function API:

```js
interface Callback {
  (error: Error, data: any): void;
}

function callServer(callback: Callback) {
  callback(null, 'hi');
}

callServer((error, data) => console.log(data));  // 'hi'
callServer('hi');                                // tsc error
```

Sometimes JavaScript functions can accept multiple types as well as varying arguments, that is, they can have different call signatures. Interfaces can be used to specify this.

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

Here is an example of an interface describing an object literal:

```js
interface Action {
  type: string;
}

let a: Action = {
    type: 'literal'
}

```
