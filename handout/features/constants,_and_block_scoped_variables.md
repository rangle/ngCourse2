# Constants, and Block Scoped Variables

ES6 introduces the concept of block scoping.  Block scoping will be familiar to
programmers from other languages like C, Java, or even PHP.  
In ES5 JavaScript and earlier, `var`s are scoped to `function`s, 
and they can "see" outside their functions to the outer context.

```js
var five = 5;
var threeAlso = three; // error

function scope1() {
  var three = 3;
  var fiveAlso = five; // == 5
  var sevenAlso = seven; // error
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
two new ways to declare variables: `const`, and `let`. 

`const`, and `let` use `{`, and `}` blocks as containers, hence "block scope". 
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

Despite the introduction of block scoping, functions are still the preferred mechanism for dealing with most loops.

`let` works like `var` in the sense that its data is read/write. `let` is also useful when used in a for loop. For example, without let, the following example would output `5,5,5,5,5`:

```js
for(var x=0; x<5; x++) {
  setTimeout(()=>console.log(x), 0)
}
```

However, when using `let` instead of `var`, the value would be scoped in a way that people would expect.

```js
for(let x=0; x<5; x++) {
  setTimeout(()=>console.log(x), 0)
}
```

Alternatively, `const` is read-only.  Once `const` has been assigned, the identifier cannot be
reassigned; however the value itself is still [mutable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const).
For example:

```js
const myName = 'pat';
let yourName = 'jo';

yourName = 'sam'; // assigns
myName = 'jan';   // error
```

The read-only nature can be demonstrated with any object:

```js
const literal = {};

literal.attribute = 'test'; // fine
literal = []; // error;
```
