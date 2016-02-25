# Template Strings

In traditional JavaScript, text that is enclosed within matching `"` marks, or
`'` marks is considered a string.  Text within double or single quotes can only
be on one line.  There was also no way to insert data into these strings.  This
resulted in a lot of ugly concatenation code that looked like:

```js

var name = 'Sam';
var age = 42;

console.log('hello my name is ' + name + ' I am ' + age + ' years old');
```

ES6 introduces a new type of string literal that is marked with back ticks (`).
These string literals _can_ include newlines, and there is a new mechanism for
inserting variables into strings:

```js

var name = 'Sam';
var age = 42;

console.log(`hello my name is ${name}, and I am ${age} years old`);
```

There are all sorts of places where these kind of strings can come in handy,
and front end web development is one of them.