# Immutable.Map
`Map` is the immutable version of JavaScript's object structure. Due to JavaScript objects having the concise object literal syntax, it's often used as a key-value store with `key` being type `string`. This pattern closely follows the map data structure. Let's revisit the previous example, but use `Immutable.Map` instead.

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

Instead of binding the object literal directly to `movie1`, we pass it as an argument to `Immutable.Map`. This changes how we interact with movie1's properties.

To _get_ the value of a property, we call the `get` method, passing the property name we want, like how we'd use an object's string indexer.

To _set_ the value of a property, we call the `set` method, passing the property name and the new value. Note that it won't mutate the existing Map object - it returns a new object with the updated property, so we must rebind the `movie2` variable to the new object.
