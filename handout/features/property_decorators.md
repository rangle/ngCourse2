# Property Decorators

Property decorators work with properties of classes.

```ts
function Override(label: string) {
  return function (target: any, key: string) {
    Object.defineProperty(target, key, { 
      configurable: false,
      get: () => label
    });
  }
}

class Test {
  @Override('test')      // invokes Override, which returns the decorator
  name: string = 'pat';
}

let t = new Test();
console.log(t.name);  // 'test'
```

The above example needs to be compiled with both the `--experimentalDecorators`
and `--emitDecoratorMetadata` flags.  

In this case the decorated property is replaced by the `label` passed to the
decorator.  In this case it's important to note that property values cannot be
directly manipulated by the decorator, instead an accessor is used.

Here's a classic property example that uses a _plain decorator_

```js
function ReadOnly(target: any, key: string) {
  Object.defineProperty(target, key, { writable: false });
}

class Test {
  @ReadOnly             // notice there are no `()`
  name: string;
}

const t = new Test();
t.name = 'jan';         
console.log(t.name); // 'undefined'
```

In this case the name property is not `writable`, and remains undefined.