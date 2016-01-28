# What is immutability?

**Immutability** is a design pattern where something can't be modified after being instantiated. If we want to change the value of that thing, we must recreate it with the new value instead. Some JavaScript types are immutable and some are mutable, meaning their value can change without having to recreate it. Let's explain this difference with some examples:

```typescript
let movie = {
  name: 'Star Wars',
  episode: 7
};

let myEp = movie.episode;

movie.episode = 8;

console.log(myEp); // outputs 7
```

As you can see in this case, although we changed the value of `movie.episode`, the value of `myEp` didn't change. That's because `movie.episode`'s type, `number`, is immutable.

```typescript
let movie1 = {
  name: 'Star Wars',
  episode: 7
};

let movie2 = movie1;

movie2.episode = 8;

console.log(movie1.episode); // outputs 8
```

In this case however, changing the value of episode on one object also changed the value of the other. That's because `movie1` and `movie2` are of the **Object** type, and Objects are mutable.

Of the JavaScript built-in types, these are immutable:
  - Boolean
  - Number
  - String
  - Symbol
  - Null
  - Undefined

These are mutable:
  - Object
  - Array
  - Function

String's an unusual case, since it can be iterated over using for...of and provides numeric indexers just like an array, but doing something like:

```typescript
let message = 'Hello world';
message[5] = '-';
console.log(message); // writes Hello world
```

**Note:** This will throw an error in strict mode and fail silently in non-strict mode.

