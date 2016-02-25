# Destructuring

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
  drawCircle: function drawCircle(radius) { /* implementation */ },
  drawText: function drawText(text) { /* implementation */ },
};

let {drawSquare, drawText} = myModule;

drawSquare(5);
drawText('hello');
```

There are _many_ more sophisticated things that can be done with destructuring,
and the [mdn][mdnDest] has some great examples, including nested Object
destructuring, and dynamic destructing during for-ins iterators.

[mdnDest]:https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment "MDN Destructuring" 