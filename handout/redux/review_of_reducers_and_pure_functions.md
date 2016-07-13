# Review of Reducers and Pure Functions

One of the core concepts of Redux is the *reducer*. A reducer is a function with the signature `(accumulator: T, item: U) => T`. Reducers are often used in JavaScript through the `Array.reduce` method, which iterates over each of the array's items and accumulates a single value as a result. Reducers should be *pure functions*, meaning they don't generate any side-effects.

A simple example of a reducer is the sum function:

```javascript
let x = [1,2,3].reduce((value,state)=>value+state,0)
// x == 6 
```
