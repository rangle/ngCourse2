# A Refresher on `this`

Inside a JavaScript class we'll be using `this` keyword to refer to the instance of the class. E.g., consider this case:

```js
class Toppings {
  ...
  formatToppings() { /* implementation details */ }
  list() {
    return this.formatToppings(this.toppings);
  }
}
```

Here `this` refers to the instance of the class, assuming that a `list` method is called using the dot notation, such as `myToppings.list()`. In this case, `this.formatToppings(this.toppings)` invokes the `formatToppings()` method defined on the instance of the class. This will also ensure that inside `formatList` we'll also have `this` referring to the same instance.

However, `this` can also refer to other things. This can get very confusing.

There are two basic cases that you would want to remember.

The first is "method invocation":

```js
  someObject.someMethod();
```

Here `this` used inside `someMethod` will refer to `someObject`. This is usually what you want.

The second case is "function invocation":


```js
  someFunction();
```

Here `this` used inside `someFunction` can refer to different things depending on whether we are in "strict" mode or not. Without using the "strict" mode, `this` refers to the context in which `someFunction()` was called. This is rarely what you want, and it can be extremely confusing. In strict mode, `this` would be `undefined`, which is slightly less confusing.

One of the implications of this is that you cannot easily detach a method from its object. E.g., consider this example:

```js
  var log = console.log;
  log('Hello');
```

In many browsers this will give you an error. That's because `log` expects `this` to refer to `console`, but this reference is lost when you detach it from `console`.

This can be fixed by specifying this explicitly. One way to do this is by using `bind()` method, which fixes the function's this to a particular value.

```js
  var log = console.log.bind(console);
  log('Hello');
```

You can also achieve the same using `Function.call` and `Function.apply`, but we won't discuss this here.

Another instance where `this` can be confusing is with respect to anonymous
functions, or functions declared within other functions.  Consider the 
following:

```js
class ServerRequest {
   notify() {
     ...
   }
   fetch() {
     getFromServer(function callback(err, data) {
        this.notify(); // this is not going to be work
     });
   }
}
```

In the above case `this` will _not_ point to the expected object, in "strict"
mode it will be `undefined`.  This leads to another ES6 feature...