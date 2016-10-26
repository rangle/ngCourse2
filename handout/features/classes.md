# Classes

Classes are a new feature in ES6, used to describe the blueprint of an object and make EcmaScript's prototypical inheritance model function more like a traditional class-based language.

```js
class Hamburger {
  constructor() {
    // This is the constructor.
  }
  listToppings() {
    // This is a method.
  }
}
```

Traditional class-based languages often reserve the word `this` to reference the current (runtime) instance of the class. In Javascript `this` refers to the calling context and therefore can change to be something other than the object.

## Object

An object is an instance of a class which is created using operator `new`. When using a dot notation to access a method on the object, `this` will refer to the object to the left of the dot.

```js
let burger = new Hamburger();
burger.listToppings();
```

Above whenever `this` is used from inside class Hamburger, it will refer to object `burger`.

## Changing Caller Context
JavaScript code can _optionally_ supply `this` to a method at call time using one of the following.

* Function.prototype.call(object [,arg, ...])
* Function.prototype.bind(object [,arg, ...])
* Function.prototype.apply(object [,argsArray])


