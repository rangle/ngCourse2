## Inheritance

JavaScript's inheritance works differently from inheritance in other languages, which can be very confusing. ES6 classes provide a syntactic sugar attempting to alleviate the issues with using prototypical inheritance present in ES5.

To illustrate this, let's image we have a zoo application where types of birds are created. In classical inheritance, we define a base class and then subclass it to create a derived class.

## Subclassing

The example code below shows how to derive Penguin from Bird using the **extend** keyword. Also pay attention to the **super** keyword used in the subclass constructor of Penguin, it is used to pass the argument to the base class Bird's constructor.

The Bird class defines the method _walk_ which is inherited by the Penguin class and is available for use by instance of Penguin objects. Likewise the Penguin class defines the method _swim_ which is not avilable to Bird objects. Inheritance works top-down from base class to its subclass.

## Object Initialization

The class constructor is called when an object is created using the **new** operator, it will be called before the object is fully created. A consturctor is used to pass in arguments to initialize the newly created object.

The order of object creation starts from its base class and then moves down to any subclass(es).

```js
// Base Class : ECMAScript 2015
class Bird {
  constructor(weight, height) {
    this.weight = weight;
    this.height = height;
  }

  walk() {
    console.log('walk!');
  }
}

// Subclass
class Penguin extends Bird {
  constructor(weight, height) {
    super(weight, height);
  }

  swim() {
    console.log('swim!');
  }
}

// Penguin object
let penguin = new Penguin(...);
penguin.walk(); //walk!
penguin.swim(); //swim!
```

Below we show how prototypal inheritance was done before class was introduced to JavaScript.

```js
// JavaScript classical inheritance.

// Bird constructor
function Bird(weight, height) {
  this.weight = weight;
  this.height = height;
}

// Add method to Bird prototype.
Bird.prototype.walk = function() {
  console.log("walk!");
};

// Penguin constructor.
function Penguin(weight, height) {
   Bird.call(this, weight, height);
}

// Prototypal inheritance (Penguin is-a Bird).
Penguin.prototype = Object.create( Bird.prototype );
Penguin.prototype.constructor = Penguin;

// Add method to Penguin prototype.
Penguin.prototype.swim = function() {
  console.log("swim!");
};

// Create a Penguin object.
let penguin = new Penguin(50,10);

// Calls method on Bird, since it's not defined by Penguin.
penguin.walk(); // walk!

// Calls method on Penguin.
penguin.swim(); // swim!
```

