# Classes

Classes are a way of describing the blueprint of an object, they are a new
feature in ES6, and make EcmaScript's prototypical inheritance model function 
more like a traditional class based language.  

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

Traditional class based languages often reserve the word `this` to reference the
current (runtime) instance of the class.  This is also true in JavaScript, _but_
JavaScript code can _optionally_ supply `this` to a method at call time.