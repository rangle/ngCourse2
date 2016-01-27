# JavaScript solutions

Some new features have been added in ES6 that allow for easier implementation of immutable data patterns.

## Object.assign

`Object.assign` lets us merge one object's properties into another one, replacing values of properties with matching names. We can use this to copy an object's values without altering the existing one.

```typescript
let movie1 = {
  name: 'Star Wars',
  episode: 7
};

let movie2 = Object.assign({}, movie1);

movie2.episode = 8;

console.log(movie1.episode); // writes 7
console.log(movie2.episode); // writes 8
```
[View example](plnkr example)

As you can see, although we have some way of copying an object, we haven't made it immutable, since we were able to set the episode's property to 8. The object assign function lets us make this modification within the method call:

```typescript
let movie1 = {
  name: 'Star Wars',
  episode: 7
};

let movie2 = Object.assign({}, movie1, { episode: 8 });

console.log(movie1.episode); // writes 7
console.log(movie2.episode); // writes 8
```
[View example](plnkr example)

But we still haven't solved the problem of potential mutation.

## Object.freeze

`Object.freeze` allows us to disable object mutation.

```typescript
let movie1 = {
  name: 'Star Wars',
  episode: 7
};

let movie2 = Object.freeze(Object.assign({}, movie1));

movie2.episode = 8; // fails silently in non-strict mode,
                    // throws error in strict mode

console.log(movie1.episode); // writes 7
console.log(movie2.episode); // writes 7
```
[View example](plnkr example)

One problem with this pattern however, is how much more verbose our code is and how difficult it is to read and understand what's actually going on with our data with all of the boilerplate calls to `Object.freeze` and `Object.assign`. We need some more sensible interface to create and interact with immutable data, and that's where Immutable.js fits in

