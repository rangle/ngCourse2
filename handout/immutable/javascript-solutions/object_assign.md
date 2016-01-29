# Object.assign

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

As you can see, although we have some way of copying an object, we haven't made it immutable, since we were able to set the episode's property to 8. Also, how do we modify the episode property in this case? We do that through the assign call:

```typescript
let movie1 = {
  name: 'Star Wars',
  episode: 7
};

let movie2 = Object.assign({}, movie1, { episode: 8 });

console.log(movie1.episode); // writes 7
console.log(movie2.episode); // writes 8
```
