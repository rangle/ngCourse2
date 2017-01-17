# Parameter Decorators


```js
function logPosition(target: any, propertyKey: string, parameterIndex: number) {
  console.log(parameterIndex);
}

class Cow {
  say(b: string, @logPosition c: boolean) {
    console.log(b);
  }
}

new Cow().say('hello', false); // outputs 1 (newline) hello
```

The above demonstrates decorating method parameters.  Readers familiar with
Angular can now imagine how  Angular implemented their
`@Inject()` system.

[mdnDest]:https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment "MDN Destructuring Assignment"
[mdnConst]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const "MDN const - const is not immutable"
