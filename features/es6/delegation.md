# Delegation

In the inheritance section we looked at one way to extend a class functionality, there is second way using delegation to extend functionality. With delegation, one object will contain a reference to a different object that it will hand off a request to perform the functionality.

The code below shows how to use delegation with the `Bird` class and `Penguin` class. The `Penguin` class has a reference to the `Bird` class and it delegates the call made to it's _walk_ method over to `Bird`'s _walk_ method.

```javascript
// ES6
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

const bird = new Bird(...);
const penguin = new Penguin(bird);
penguin.walk(); //walk!
penguin.swim(); //swim!
```

A good discussion on 'behaviour delegation' can be found [here](https://medium.com/@SigniorGratiano/behavior-delegation-notes-b75b8fa354bf).
