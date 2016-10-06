## Inheritance

JavaScript's inheritance works differently from inheritance in other languages, which can be very confusing. ES6 classes provide a syntactic sugar attempting to alleviate the issues with using prototypical inheritance present in ES5. Our recommendation is still to avoid using inheritance or at least deep inheritance hierarchies. Try solving the same problems through delegation instead.

To illustrate this, let's image we have a transit project where two types of vehicles are available including a car and a bus. In the classical inheritance case, we would define an parent class `Vehicle` first, then let `Car` and `Bus` be two descents of `Vehicle`:
```js
//ES6
class Vehicle {
  constructor(weight, dimension, price){
    this.weight = weight;
    this.dimension = dimension;
    this.price = price;
  }
}

class Car extends Vehicle {
  constructor(weight, dimension, price){
    super(weight, dimension, price);
  }
  honk() {
    console.log("Beep!");
  }
}

class Bus extends Vehicle {
  constructor(weight, dimension, price){
    super(weight, dimension, price);
  }
  honk() {
    console.log("Beeeeeeeeep!");
  }
}

let car = new Car(...);
let bus = new Bike(...);
```
and if we use delegation:
```js
let Car = {
  init(weight, dimension, price){
    this.weight = weight;
    this.dimension = dimension;
    this.price = price;
  }
};

Car.init(...);
Car.honk = function() {
  console.log("Beep!");
}

let Bus = Object.create( Car );
//Delegate to Car's init method
Bus.init(...);
Bus.honk = function() {
  console.log("Beeeeeeeeep!");
}
```
The main difference here is that in delegation case, we create the instance `Car` and `Bus` directly, then let the `Car` object link(delegate) to another object `Bus` when we need its methods. But in inheritance case, we create two blueprints (class) first, then make instances accordingly. The method is inherited from parent class. Delegation simplifies the thinking process behind the project and consequently leads to a more efficient development cycle. More detailed explanation on delegation pattern can be found [here](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch6.md).  
