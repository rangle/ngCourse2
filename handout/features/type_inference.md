# Type Inference

One common misconception about TypeScript's types are that code needs to 
explicitly describe types at every possible opportunity.  Fortunately this is
not the case.  TypeScript has a rich type inference system that will "fill in
the blanks" for the programmer. Consider the following:

type-inference-finds-error.ts
```js
let numbers = [2, 3, 5, 7, 11];
numbers = ['this will generate a type error'];
```

```bash
tsc ./type-inference-finds-error.ts 
type-inference-finds-error.ts(2,1): error TS2322: Type 'string[]' is not assignable to type 'number[]'.
  Type 'string' is not assignable to type 'number'.
```

The code contains no extra type information.  In fact, it's valid ES6.  
If `var` had been used, it would be valid ES5.  Yet TypeScript is still
able to determine type information.

Type inference can also work through context, which is handy with callbacks. 
Consider the following:

type-inference-finds-error-2.ts
```js

interface FakeEvent {
  type: string;
}

interface FakeEventHandler {
  (e: FakeEvent):void; 
}

class FakeWindow {
  onMouseDown: FakeEventHandler
}
const fakeWindow = new FakeWindow();

fakeWindow.onMouseDown = (a: number) => {
  // this will fail
};
```

```bash
tsc ./type-inference-finds-error-2.ts 
type-inference-finds-error-2.ts(14,1): error TS2322: Type '(a: number) => void' is not assignable to type 'FakeEventHandler'.
  Types of parameters 'a' and 'e' are incompatible.
    Type 'number' is not assignable to type 'FakeEvent'.
      Property 'type' is missing in type 'Number'.
```

In this example the context is not obvious since the interfaces have been
defined explicitly.  In a browser environment with a real `window` object, this
would be a handy feature, especially the type completion of the `Event`
object.
