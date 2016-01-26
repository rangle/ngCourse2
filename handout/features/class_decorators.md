# Class Decorators

```
function log(prefix?: string) {
  return (target) => {
    // save a reference to the original constructor
    var original = target;
 
    // a utility function to generate instances of a class
    function construct(constructor, args) {
      var c : any = function () {
        return constructor.apply(this, args);
      }
      c.prototype = constructor.prototype;
      return new c();
    }
   
    // the new constructor behaviour
    var f : any = function (...args) {
      console.log(prefix + original.name);
      return construct(original, args);
    }
   
    // copy prototype so instanceof operator still works
    f.prototype = original.prototype;
   
    // return new constructor (will override original)
    return f;
  };
}

@log('hello')
class World {
}

const w = new World(); // outputs "helloWorld"

```

In the example `log` is invoked using `@`, and passed a string as a parameter,
`@log()` returns an anonymous function that is the actual decorator.

The decorator function takes a `class`, or constructor function (ES5) as an
argument.  The decorator function then returns a new class construction
function that is used whenever `World` is instantiated.

This decorator does nothing other than log out its given parameter, and its
`target`'s class name to the console.