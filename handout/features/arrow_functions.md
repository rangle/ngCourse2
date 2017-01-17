# Arrow Functions

ES6 offers some new syntax for dealing with `this`: "arrow functions".  
Arrow functions also make higher order functions much easier to work with.

The new "fat arrow" notation can be used to define anonymous functions in a simpler way.

Consider the following example:

```js
  items.forEach(function(x) {
    console.log(x);
    incrementedItems.push(x+1);
  });
```

This can be rewritten as an "arrow function" using the following syntax:

```js
  items.forEach((x) => {
    console.log(x);
    incrementedItems.push(x+1);
  });
```

Functions that calculate a single expression and return its values can be defined even simpler:

```js
  incrementedItems = items.map((x) => x+1);
```

The latter is _almost_ equivalent to the following:

```js
  incrementedItems = items.map(function (x) {
    return x+1;
  });
```

There is one important difference, however: arrow functions do not set a local copy of `this`, `arguments`, `super`, or `new.target`.  When `this` is used inside an arrow function JavaScript uses the `this` from the outer scope. Consider the following example:

```js
class Toppings {
  constructor(toppings) {
    this.toppings = Array.isArray(toppings) ? toppings : [];
  }
  outputList() {
    this.toppings.forEach(function(topping, i) {
      console.log(topping, i + '/' + this.toppings.length);  // `this` will be undefined
    });
  }
}

var myToppings = new Toppings(['cheese', 'lettuce']);

myToppings.outputList();
```

Let's try this code on [http://jsbin.com](http://jsbin.com/qakigoqulo/edit?js,console). As we see, this gives us an error, since `this` is undefined inside the anonymous function.

Now, let's change the method to use the arrow function:

```js
class Toppings {
  constructor(toppings) {
    this.toppings = Array.isArray(toppings) ? toppings : [];
  }
  outputList() {
    this.toppings.forEach((topping, i) => {
      console.log(topping, i + '/' + this.toppings.length)  // `this` works!
    });
  }
}

var myToppings = new Toppings(['cheese', 'lettuce']);

myToppings.outputList();

```

Let's try this code on [http://jsbin.com](http://jsbin.com/tulikutife/edit?js,console). Here `this` inside the arrow function refers to the instance variable. 

*Warning* arrow functions do _not_ have their own `arguments` variable, which
can be confusing to veteran JavaScript programmers. `super` and `new.target`
are also scoped from the outer enclosure.
