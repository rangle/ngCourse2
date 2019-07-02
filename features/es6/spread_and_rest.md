# ...spread and ...rest

A Spread syntax allows in-place expansion of an expression for the following cases:

1. Array
2. Function call
3. Multiple variable destructuring

Rest parameters works in the opposite direction of the spread syntax, it collects an indefinite number of comma separated expressions into an array.

## Spread Syntax

Spread example:

```javascript
const add = (a, b) => a + b;
let args = [3, 5];
add(...args); // same as `add(args[0], args[1])`, or `add.apply(null, args)`
```

Functions aren't the only place in JavaScript that makes use of comma separated lists - arrays can now be concatenated with ease:

```javascript
let cde = ['c', 'd', 'e'];
let scale = ['a', 'b', ...cde, 'f', 'g'];  // ['a', 'b', 'c', 'd', 'e', 'f', 'g']
```

Similarly, object literals can do the same thing:

```javascript
let mapABC  = { a: 5, b: 6, c: 3};
let mapABCD = { ...mapABC, d: 7};  // { a: 5, b: 6, c: 3, d: 7 }
```

## Rest parameter

Rest parameters share the ellipsis like syntax of spread syntax but are used for a different purpose. Rest parameters are used to access indefinite number of arguments passed to a function. For example:

```javascript
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

Technically JavaScript already had an `arguments` variable set on each function \(except for arrow functions\), however `arguments` has a lot of issues, one of which is the fact that it is not technically an array.

Rest parameters are in fact arrays which provides access to methods like `map, filter, reduce and more`. The other important difference is that rest parameters only include arguments not specifically named in a function like so:

```javascript
function print(a, b, c, ...more) {
  console.log(more[0]);
  console.log(arguments[0]);
}

print(1, 2, 3, 4, 5);
// 4
// 1
```

_Note: Commonly spread syntax and rest parameters are referenced as Spread and Rest operators but they aren't operators according to ECMAScript specifications. Few references_ [_MDN-Spread Syntax_](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Spread_operator)_,_ [_MDN-Rest Parameters_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)_,_ [_ECMAScript Spec - Spread Syntax_](http://www.ecma-international.org/ecma-262/6.0/#sec-array-initializer)_,_ [_ECMAScript Spec - Rest Parameters_](http://www.ecma-international.org/ecma-262/6.0/#sec-function-definitions)

