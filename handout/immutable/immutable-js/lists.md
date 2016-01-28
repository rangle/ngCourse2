# Immutable.List

`List` is the immutable version of JavaScript's array structure.

```typescript
let movies = Immutable.fromJS([ // again use fromJS for deep immutability
  {
    name: 'The Fellowship of the Ring',
    released: 2001,
    rating: 8.8
  },
  {
    name: 'The Two Towers',
    released: 2002,
    rating: 8.7
  }
]);

movies = movies.push(Immutable.Map({
    name: 'The Return of the King',
    released: 2003
}));

movies = movies.update(2, movie => movie.set('rating', 8.9)); // 0 based

movies = movies.zipWith(
  (movie, seriesNumber) => movie.set('episode', seriesNumber),
  Immutable.Range(1, movies.size + 1) // size property instead of length
);

console.log(movies);
/* writes
List [
  Map { "name": "The Fellowship of the Ring", "released": 2001, "rating": 8.8, "episode": 1 },
  Map { "name": "The Two Towers", "released": 2002, "rating": 8.7, "episode": 2 },
  Map { "name": "The Return of the King", "released": 2003, "rating": 8.9, "episode": 3 } ]
  */
```

Here we use the `Immutable.fromJS` call again since we have objects stored in the array. We call `push` to add items to the list, just like we would call it on an array but since we're creating a new copy we need to rebind the variable. We have the same `set` and `update` calls when we want to update items at specific indexes. We also have access to array functions like `map`, `reduce` with support for extras like the one we're using here, `zipWith`.

