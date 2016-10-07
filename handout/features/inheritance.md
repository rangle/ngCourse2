## Inheritance

JavaScript's inheritance works differently from inheritance in other languages, which can be very confusing. ES6 classes provide a syntactic sugar attempting to alleviate the issues with using prototypical inheritance present in ES5. Our recommendation is still to avoid using inheritance or at least deep inheritance hierarchies. Try solving the same problems through delegation instead.

To illustrate this, let's image we have a zoo application where types of birds are created. In the classical inheritance case, we would define an parent class `Bird` first, then let, say, `Penguin` be a descent of `Bird`:
```js
//ES6
class Bird {
  constructor(weight, height) {
    this.weight = weight;
    this.height = height;
  }
  walk() {
    console.log('walk!');
  }
}

class Penguin extends Bird {
  constructor(weight, height) {
    super(weight, height);
  }
  swim() {
    console.log('swim!');
  }
}

let penguin = new Penguin(...);
penguin.walk(); //walk!
penguin.swim(); //swim!
```
and if we use delegation with `class` keyword:
```js
//ES6
class Bird {
  constructor(weight, height) {
    this.weight = weight;
    this.height = height;
  }
  walk() {
    console.log('walk!');
  }
}

class Penguin {
  constructor(bird) {
    this.bird = bird;
  }
  walk() {
    this.bird.walk();
  }
  swim() {
    console.log('swim!');
  }
}

let bird = new Bird(...);
let penguin = new Penguin(bird);
penguin.walk(); //walk!
penguin.swim(); //swim!
```
and delegation without `class` keyword (which is a more general JavaScript way):
```js
//ES6
let bird = {
  init(weight, height) {
    this.weight = weight;
    this.height = height;
  },
  walk() {
    console.log("walk!")''
  }
};

bird.init(...);
let penguin = Object.create( bird );
penguin.swim = function() {
  console.log("swim!");
}

//Delegate to Bird's walk method
penguin.walk(); //walk!
Penguin.swim(); //swim!
```
The main difference here is that in delegation case, we let the `Penguin` delegate to `Bird` when we need `walk()`. But in inheritance case, we create two blueprints (class) first, the method is inherited from parent class. Delegation simplifies the thinking process behind the project and consequently leads to a more efficient development cycle. More detailed explanation on delegation pattern can be found [here](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch6.md).  

Nota that in Angular 2, developers do not need to worry about this too much. The framework has already taken care of this and we just need to follow Angular's patterns and APIs.
