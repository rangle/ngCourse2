# TypeScript Features

Now that producing JavaScript from TypeScript code has been de-mystified, some of
its features can be described and experimented with.

- Types
- Interfaces
- Shapes
- Decorators

## Types

Many people do not realize it, but JavaScript _does_ in fact have types, they're
just "duck typed", which roughly means that the programmer does not have to think
about them. JavaScript's types also exist in TypeScript:

- `boolean` (true/false)
- `number` integers, floats, `Infinity` and `NaN`
- `string` characters and strings of characters
- `[]` Arrays of other types, like `number[]` or `boolean[]`
- `{}` Object literal
- `undefined` not set

TypeScript also adds

- `enum` enumerations like `{ Red, Blue, Green }`
- `any` use any type
- `void` nothing

Primitive type example:

```ts
let isDone: boolean = false;
let height: number = 6;
let name: string = "bob";
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];
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

This illustrates the primitive types in TypeScript, and ends by illustrating
a `showMessage` function. In this function the parameters have specific types
that are checked when `tsc` is run.

In many JavaScript functions it's quite common for functions to take optional
parameters. TypeScript provides support for this, like so:

```ts
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

Using a `?` lets `tsc` know that `isDebug` is an optional parameter.  `tsc`
will not complain if `isDebug` is omitted.
