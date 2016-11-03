# Operators Spread and Rest

A Spread operator allows in-place expansion of an expression for the following cases:

1. Array
1. Function call
1. Multiple variable destructuring

The Rest operator works in the opposite direction of the spread operator, it collects an indefinite number of comma separated expressions into an array.

## Operator Spread

Spread example:

```js
const add = (a, b) => a + b;
let args = [3, 5];
add(...args); // same as `add(args[0], args[1])`, or `add.apply(null, args)`
```

Functions aren't the only place in JavaScript that makes use of comma separated
lists - arrays can now be concatenated with ease:

```js
let cde = ['c', 'd', 'e'];
let scale = ['a', 'b', ...cde, 'f', 'g'];  // ['a', 'b', 'c', 'd', 'e', 'f', 'g']
```

Similarly, object literals can do the same thing:

```js
let mapABC  = { a: 5, b: 6, c: 3};
let mapABCD = { ...mapABC, d: 7};  // { a: 5, b: 6, c: 3, d: 7 }
```

## Operator Rest

Rest arguments share the ellipsis like syntax of rest operators but are used
for a different purpose. Rest arguments are used to access a variable number
of arguments passed to a function. For example:

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

Rest arguments are in fact arrays. The other important difference is that
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
