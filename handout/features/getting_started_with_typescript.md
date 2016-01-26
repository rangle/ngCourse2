# Getting Started With TypeScript


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

Our earlier ES6 class won't compile now. TypeScript is more demanding than ES6 and it expects instance properties to be declared:

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