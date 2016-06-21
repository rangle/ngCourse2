# TypeScript

ES6 is the upcoming version of JavaScript.  TypeScript is a superset of ES6,
which means all ES6 features are part of TypeScript, but not all TypeScript
features are part of ES6.  Consequently, TypeScript must be transpiled into ES5
to run in most browsers.

One of TypeScript's primary features is the addition of type information, hence
the name.  This type information can help make JavaScript programs more
predictable and easier to reason about. 

Types let developers write more explicit "contracts". In other words, things 
like function signatures are more explicit. 

Without TS:

```js
function add(a, b) {
  return a + b;
}

add(1, 3);   // 4
add(1, '3'); // '13'
```

With TS:

```js
function add(a: number, b: number) {
  return a + b;
}

add(1, 3);   // 4
// compiler error before JS is even produced
add(1, '3'); // '13'

```
