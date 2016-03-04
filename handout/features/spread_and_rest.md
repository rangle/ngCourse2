# ...spread, and ...rest

Spread takes a collection of something, like `[]`s or `{}`s, and applies them to
something else that accepts `,` separated arguments, like `function`s, `[]`s,
and `{}`s.

For example:

```js

const add = (a, b) => a + b;
let args = [3, 5];
add(...args); // same as `add(args[0], args[1])`, or `add.apply(null, args)`
```

Functions aren't the only place in JavaScript that makes use of comma separated
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
  return numbers[0] + numbers[1];
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
  console.log(more[0]);
  console.log(arguments[0]);
}

print(1, 2, 3, 4, 5);
// 4
// 1

```
