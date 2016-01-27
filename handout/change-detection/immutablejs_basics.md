# Immutable.js basics

Immutable.js needs to at least provide immutable versions of the two core mutable types in JavaScript, object and array.

## Immutable.Map
`Map` is the immutable version of JavaScript's object structure. Due to JavaScript objects having the concise object literal syntax, it's often used as a key-value store with key being type `string` and value being `any` type. Let's revisit the previous example, but instead use `Immutable.Map`.

```typescript
import * as Immutable from 'immutable';

let movie1 = Immutable.Map<string, any>({
  name: 'Star Wars',
  episode: 7
});

let movie2 = movie1;

movie2 = movie2.set('episode', 8);

console.log(movie1.get('episode')); // writes 7
console.log(movie2.get('episode')); // writes 8
```
[View example](plnkr example)

Instead of creating binding the object literal directly to `movie1`, we pass it as an argument to `Immutable.Map`. This changes how we interact with movie1's properties.

To _get_ the value of a property, we call the `get` method, passing the property name we want, like how we would use an object's array indexer.

To _set_ the value of a property, we call the `set` method, passing the property name and the new value. Note however, that it won't mutate the existing Map object. It returns a new object with the updated property so we need to rebind the `movie2` variable to the new object.

### Map.merge

Sometimes we want to update multiple properties. We can do this using the `merge` method.

```typescript
let baseButton = Immutable.Map<string, any>({
  text: 'Click me!',
  state: 'inactive',
  width: 200,
  height: 30
});

let submitButton = baseButton.merge({
  text: 'Submit',
  state: 'active'
});

console.log(submitButton.toObject());
```
[View Example](plnkr example)

### Maps are iterable

Maps in Immutable.js are iterable, meaning that you can `map`, `filter`, `reduce`, etc. each key-value pair in the map.

// quick example here

## Immutable.List

`List` is the immutable version of JavaScript's array structure.

```typescript
interface Movie {
  name: string;
  released: number;
  rating: number;
}

let movies = Immutable.List([
  {
    name: 'The Fellowship of the Ring',
    released: 2001,
    rating: 8.8
  },
  {
    name: 'The Two Towers',
    released: 2002,
    rating: 8.7
  },
]);
```


## Official documentation

For more information on Immutable.js, visit the official documentation at [https://facebook.github.io/immutable-js/](https://facebook.github.io/immutable-js/).