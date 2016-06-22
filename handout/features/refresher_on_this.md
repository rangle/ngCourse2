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

Here `this` refers to an instance of the `Toppings` class. As long as the `list` method is called using dot notation, like `myToppings.list()`, then `this.formatToppings(this.toppings)` invokes the `formatToppings()` method defined on the instance of the class. This will also ensure that inside `formatToppings`, `this` refers to the same instance.

However, `this` can also refer to other things. There are two basic cases that you should remember.

1. Method invocation:

   ```js
     someObject.someMethod();
   ```

   Here, `this` used inside `someMethod` will refer to `someObject`, which is usually what you want.

2. Function invocation:

   ```js
     someFunction();
   ```

   Here, `this` used inside `someFunction` can refer to different things depending on whether we are in "strict" mode or not. Without using the "strict" mode, `this` refers to the context in which `someFunction()` was called. This rarely what you want, and it can be confusing when `this` is not what you were expecting, because of where the function was called from. In "strict" mode, `this` would be undefined, which is slightly less confusing.

[View Example](http://jsbin.com/vekawimihe/2/edit?js,console)

One of the implications is that you cannot easily detach a method from its object. Consider this example:

```js
  var log = console.log;
  log('Hello');
```

In many browsers this will give you an error. That's because `log` expects `this` to refer to `console`, but the reference was lost when the function was detached from `console`.

This can be fixed by setting `this` explicitly. One way to do this is by using `bind()` method, which allows you to specify the value to use for `this` inside the bound function.

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
        this.notify(); // this is not going to work
     });
   }
}
```

In the above case `this` will _not_ point to the expected object: in "strict"
mode it will be `undefined`.  This leads to another ES6 feature - arrow functions, which will be covered next.
