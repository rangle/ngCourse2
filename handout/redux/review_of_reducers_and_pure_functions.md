# Review of Reducers and Pure Functions

One of the core concepts of Redux is the reducer. A reducer is simply a function that iterates over a collection of values, and returns a new single value at the end of it.

A simple example of a reducer is a sum function:

```javascript
let x = [1,2,3].reduce((value,state)=>value+state,0)
// x == 6 
```
