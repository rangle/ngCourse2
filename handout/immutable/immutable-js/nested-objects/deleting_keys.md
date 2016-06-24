# Deleting Keys

Keys can be deleted from maps using the `Map.delete` and `Map.deleteIn` methods.

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

movie = movie.delete('mpaa');

console.log(movie.toObject());

/* writes
{ name: 'Star Wars',
  episode: 7,
  actors: List [ Map { "name": "Daisy Ridley", "character": "Rey" }, Map { "name": "Harrison Ford", "character": "Han Solo" } ] }
*/
```

