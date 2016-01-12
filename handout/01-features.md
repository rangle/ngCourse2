# Part 1: EcmaScript 6 and TypeScript Features #

The new version of JavaScript, "EcmaScript 6" or "ES6", offers a number of new features that extend the power of the language. (The language we usually call "JavaScript" is actually formally known as "EcmaScript".) ES6 is not widely supported in today's browsers, so it needs to be transpiled to ES5. You can choose between several transpilers, but we'll be using TypeScript, which is what the Angular team users to write Angular 2. Angular 2 makes use of a number of features of ES6 and TypeScript.


## Classes

ES5 has objects, but it has no concept of class. ES6 introduces classes.

```ts
class LoginFormController {
  constructor() {
    // This is the constructor.
  }
  submit() {
    // This is a method.
  }
}
```

This is pretty straightforward, until we run into the oddities of how `this` keyword works in JavaScript.

## A Refresher on `this`

Inside a JavaScript class we'll be using `this` keyword to refer to the instance of the class. E.g., consider this case:

```ts
class LoginFormController {
  ...
  submit() {
    var form = {
      data: this
    };
    this.fireSubmit(form);
  }
}
```

Here `this` refers to the instance of the class, assuming that a submit method is called using the dot notation, such as `myComponent.submit()`. In this case, `this.fireSubmit(form)` invokes the `fireSubmit()` method defined on the instance of the class. This will also ensure that inside `fireSubmit` we'll also have `this` referring to the same instance.

However, `this` can also refer to other things. This can get very confusing.

There are two basic cases that you would want to remember.

The first is "method invocation":

```ts
  someObject.someMethod();
```

Here `this` used inside `someMethod` will refer to `someObject`. This is usually what you want.

The second case is "function invocation":


```ts
  someFunction();
```

Here `this` used inside `someFunction` can refer to different things depending on whether we are in "strict" mode or not. Without using the "strict" mode, `this` refers to the context in which `someFunction()` was called. This is rarely what you want, and it can be extremely confusing. In strict mode, `this` would be undefined, which is slightly less confusing.

One of the implications of this is that you cannot easily detach a method from its object. E.g., consider this example:

```ts
  var log = console.log;
  log('Hello');
```

In many browsers this will give you an error. That's because `log` expects `this` to refer to `console`, but this reference is lost when you detach it from `console`.

This can be fixed by specifying this explicitly. One way to do this is by using `bind()` method, which fixes the function's this to a particular value.

```ts
  var log = console.log.bind(console);
  log('Hello');
```

You can also achieve the same using `Function.call` and `Function.apply`, but we won't discuss this here.

## Arrow Functions

ES6 offers some new syntax for dealing with this madness: "arrow functions".

The new "fat arrow" notation can be used to define anonymous functions in a simpler way.

Consider the following example:

```ts
  items.forEach(function(x) {
    console.log(x);
    incrementedItems.push(x+1);
  });
```

This can be rewritten as an "arrow function" using the following syntax:

```ts
  items.forEach((x) => {
    console.log(x);
    incrementedItems.push(x+1);
  });
```

Functions that calculate a single expression and return its values can be defined even simpler:

```ts
  incrementedItems = items.map((x) => x+1);
```

The latter is _almost_ equivalent to the following:

```ts
  incrementedItems = items.map(function (x) {
    return x+1;
  });
```

There is one important difference, however: arrow functions share the value of `this` with the function in the context of which they are defined. Consider the following example:

```ts
class LoginFormController {
  constructor() {
    this.errorMessage = 'All good.';
  }
  submit() {
    [1, 2].forEach(function() {
      console.log(this.errorMessage); // this is undefined here
    })
  }
}

var ctrl = new LoginFormController();

ctrl.submit();
```

Let's try this code on ES6 Fiddle ([http://www.es6fiddle.net/](http://www.es6fiddle.net/)). As we see, this gives us an error, since `this` is undefined inside the anonymous function.

Now, let's change the method to use the arrow function:

```ts
class LoginFormController {
  constructor() {
    this.errorMessage = 'All good.';
  }
  submit() {
    [1, 2].forEach(() => console.log(this.errorMessage));
  }
}
```

Here `this` inside the arrow function refers to the instance variable.

## Inheritance

JavaScript's inheritance works differently from inheritance in other languages, which can be very confusing. ES6 classes provide a syntactic sugar attempting to alleviate the issues with using prototypical inheritance present in ES5. Our recommendation is still to avoid using inheritance or at least deep inheritance hierarchies. Try solving the same problems through delegation instead.


## TypeScript

As of right now, no browser comes even close to supporting all of ES6. Support for classes is especially poor. Instead, we will need to rely on a transpiler to convert our ES6 code to ES5.

Several ES6 transpilers are available. One popular option is Babel. However, we will be using TypeScript transpiler, which is what the Angular team uses to write Angular 2.

TypeScript transpiler is different from other ES6 transpilers in that it expects as input not standard EcmaScript 6, but rather TypeScript, an extension of ES6 that adds support for optional typing.

We can install the TypeScript transpiler using npm:

```bash
  npm install -g typescript
```

We can then use `tsc` to manually compile a TypeScript source file into ES5:

```bash
  tsc test.ts
  node test.js
```

Our earlier ES6 class won't compile now, however. TypeScript is more demanding than ES6 and it expects instance properties to be declared:

```ts
  class LoginFormController {
    errorMessage: string;
    constructor() {
      this.errorMessage = 'All good.';
    }
    submit() {
      [1, 2].forEach(() => console.log(this.errorMessage));
    }
  }
```

Note that now that we've declared `errorMessage` to be a string, TypeScript will enforce this. If we try to assign a number to it, we will get an error at compilation time.

If you want to have a property that can be set to a value of any type, however, you can still do this: just declare it's type to be "any":

```ts
  class LoginFormController {
    errorMessage: any;
    ...
  }
```

## TypeScript with Webpack

We won't be running `tsc` manually, however. Instead, Webpack's 'ts' loader will do the transpilation during the build:

```javascript
  // webpack.config.js
  ...
  loaders: [
    { test: /\.ts$/, loader: 'ts', exclude: /node_modules/ },
    ...
```

## Loading ES6 Modules

ES6 also introduces the concept of a module, which works in a similar way to other languages. Defining an ES6 module is quite easy: each file is assumed to define a module and we'll specify it's exported values using the `export` keyword. Loading ES6 modules is a little trickier.

In a ES6 compliant browser you would be using the `System` keyword to load modules asynchronously. To make our code work with the browsers of today, however, we will use SystemJS library as a polyfill:

```html
  <script src="/node_module/systemjs/dist/system.js"></script>
  <script>
    var promise = System.import('app')
      .then(function() {
        console.log('Loaded!');
      })
      .then(null, function(error) {
        console.error('Failed to load:', error);
      });
  </script>
```

## Additional ES6 Features

In addition to classes and arrow functions, ES6 offers numerous other features not available in ES5. Most of those are currently supported by TypeScript. We won't discuss those features here, though we will come across some of them in the course. We encourage you to learn more about them on your own, however. This repository provides a good overview: [https://github.com/lukehoban/es6features](https://github.com/lukehoban/es6features).

## Typescript Features ##

### Basic Types ###
Typescript allows for the use of simple units of data: numbers, strings, boolean etc. Types are the same as you would expect them to be in JavaScript. The list of types allowed in typescript are:
* Boolean
* Number: 
* String: 
* Array
* Enum
* Any
* Void

```javascript
var isDone: boolean = false;
var height: number = 6;
var name: string = "bob";
var list:number[] = [1, 2, 3]; 
var list:Array<number> = [1, 2, 3];
enum Color {Red, Green, Blue};
var c: Color = Color.Green;
var notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

function showMessage(): void {
    alert("hello there");
}
```

### Interfaces ##

```javascript
interface Shape {
	area(): void;
};

class Circle implements Shape {
	constructor(public radius:number){
	};
	
	area():void {
		let area:number = 3.14 * this.radius * this.radius;
		console.log('area of circle with radius ' + this.radius + ' = ' + area);
	}	
}

class Square implements Shape {
	constructor(public side:number){
	};
	
	area():void {
		let area:number = this.side * this.side;
		console.log('area of square with side ' + this.side + ' = ' + area);
	}	
}

new Circle(10).area();
new Square(10).area();
```
### Classess ###

```javascript
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

var greeter = new Greeter("world");
```

### Inheritance ###

```javascript
enum Gender {Male, Female};
enum Role {Admin, Manager};

class User {
    constructor(public name: string) { }
    role(role: Role) {
        alert(this.name + " has role " + Role[role]);
    }
}

class Admin extends User {
    constructor(name: string) { 
		super(name); 
		this.role();
	}
    role() {
        alert("initializing Admin");
        super.role(Role.Admin);
    }
}

class Manager extends User {
    constructor(name: string) { 
		super(name); 
		this.role();
	}
    role() {
        alert("initializing Manager");
        super.role(Role.Manager);
    }
}

var sam:Admin = new Admin("Sam");
var tom:Manager = new Manager("Tom");

```

### Generics ###

```javascript
class TestGenerics<T> {
    message: T;
    constructor(message: T) {
        this.message = message;
		this.display();
    }
    display():void {
        alert(typeof(this.message));
    }
}

var stringTest = new TestGenerics<string>("Hello, world");
var booleanTest = new TestGenerics<boolean>(true);

```