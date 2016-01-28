# Nested Objects

`Immutable.Map` wraps objects shallowly, meaning if you have an object with properties bound to mutable types then those properties can be mutated.

```typescript
let movie = Immutable.Map({
	name: 'Star Wars',
	episode: 7,
	actors: [
		{ name: 'Daisy Ridley', character: 'Rey'},
		{ name: 'Harrison Ford', character: 'Han Solo' }
	],
	mpaa: {
		rating: 'PG-13',
		reason: 'sci-fi action violence'
	}
});

movie.get('actors').pop();
movie.get('mpaa').rating = 'PG';

console.log(movie.toObject());

/* writes
{ name: 'Star Wars',
  episode: 7,
  actors: [ { name: 'Daisy Ridley', character: 'Rey' } ],
  mpaa: { rating: 'PG', reason: 'sci-fi action violence' } }
  */
```

To avoid this issue, use `Immutable.fromJS` instead.

```typescript
let movie = Immutable.fromJS({
	name: 'Star Wars',
	episode: 7,
	actors: [
		{ name: 'Daisy Ridley', character: 'Rey'},
		{ name: 'Harrison Ford', character: 'Han Solo' }
	],
	mpaa: {
		rating: 'PG-13',
		reason: 'sci-fi action violence'
	}
});

movie.get('actors').pop();
movie.get('mpaa').rating = 'PG';

console.log(movie.toObject());

/* writes
{ name: 'Star Wars',
  episode: 7,
  actors: List [ Map { "name": "Daisy Ridley", "character": "Rey" }, Map { "name": "Harrison Ford", "character": "Han Solo" } ],
  mpaa: Map { "rating": "PG-13", "reason": "sci-fi action violence" } }
*/
```

So let's say you want to modify `movie.mpaa.rating`, you might think of doing something like this: `movie = movie.get('mpaa').set('rating', 'PG')`. However, `set` will always return the calling Map instance which in this case returns the Map bound to the `mpaa` key rather than the movie you wanted. We need to use the `setIn` method to update nested properties.

```typescript
let movie = Immutable.fromJS({
	name: 'Star Wars',
	episode: 7,
	actors: [
		{ name: 'Daisy Ridley', character: 'Rey'},
		{ name: 'Harrison Ford', character: 'Han Solo' }
	],
	mpaa: {
		rating: 'PG-13',
		reason: 'sci-fi action violence'
	}
});

movie = movie
  .update('actors', actors => actors.pop())
  .setIn(['mpaa', 'rating'], 'PG');

console.log(movie.toObject());

/* writes
{ name: 'Star Wars',
  episode: 7,
  actors: List [ Map { "name": "Daisy Ridley", "character": "Rey" } ],
  mpaa: Map { "rating": "PG", "reason": "sci-fi action violence" } }
*/
```

We also added in a call to `Map.update` which, unlike set, accepts a function as the second argument instead of a value. This function accepts the existing value at that key and must return the new value of that key.

