# ImmutableJS Overview

### Index
  1. Mutable vs. Immutable
  2. Persistent Data Structures
  3. Structural Sharing
  4. ImmutableJS API
  5. Todo app with ReactJS and ImmutableJS

### Mutable vs. Immutable
Mutable data is data that can be changed in place.

Mutable data makes application development difficult because it makes the following things hard:

  1. Keeping track of mutated data, and
  2. Maintaining application state

**Immutable** data cannot be changed and it makes application development safer and simpler.

In JavaScript we have 6 primitive data types:

  1. Boolean
  2. Number
  3. String
  4. Symbol
  5. Null
  6. Undefined

```
Note: Symbol was introduced in ECMAScript 6
```

All of these primitive data types are **immutable** which means their values cannot be changed. For example, assign a string literal ` "Hello" ` to a variable ` str ` and then attempt to change the first character to ` "Y" ` in the following way:

```javascript
var str = 'Hello';
str[0] = 'Y';
console.log(str); // Hello <= did not change 'H' to 'Y'
```

The only way to manipulate strings is through methods such as ` trim `, ` slice `, ` replace ` etc. However, even with those methods the original value does not change:

```javascript
var str1 = 'Hello';
var str2 = str1.replace('H', 'Y');
console.log(str1); // This outputs `Hello` <= this value has not changed
console.log(str2); // This outputs `Yello`
```

Also, number values do not change:
```javascript
var num1 = 12;
var num2 = num1 + 3;


console.log(num1); // num1 is still 12
console.log(num2); // num2 is the new value 15

num1 += 4;         // num1 now points to the new value,
                   //   we just chose not to save it's previous value

console.log(num1); // 16
```

Note that `var num1 = num1 + 3` did not change the meaning of the number `12` to `15`.
Also, in `num1 += 4` we just no longer care about the old value `12` and allowed `num1` to point to the new value and discarded the old one.

In JavaScript, **objects** and **arrays** are **mutable**

```javascript
var arr = [1, 2, 3];
var abc = arr.push(4);

console.log(arr); // [1, 2, 3, 4] <= arr was modified
console.log(abc); // 4            <= We have lost the original array!!
```

### Persistent Data Structures

Persistent data structures provides operators/methods which allow users to perform certain manipulation to the data without changing the original. Such data structure is effectively **immutable**.

From our previous example we saw that an `Array` is immutable, and pushing an element onto it would replace the original with the new array `[1, 2, 3, 4]`. The `push` method returns the element that was pushed and not the mutated array.

Ideally we want some **immutable** array data structure which would look something like this:
```javascript
var arr = ImmutableArray([1, 2, 3]);
var newArr = arr.push(4);

console.log(arr.toArray());    // [1,2,3]      <= The old array is preserved
console.log(newArr.toArray()); // [1, 2, 3, 4] <= the new modified array
```

By default objects in JS are mutable, as we already saw, however we can make them **immutable** without using any external libraries. This can be done by the use of the **ES5** and **ES6** `Object.assign()` and `Object.freeze`.
```js
var a = [1, 2, 3, 4];
var a_copy = Object.assign([], a);

Object.freeze(a); // Freezing any object and array will prevent any future mutation

a.push(5);        // Uncaught TypeError: Can't add property 5, object is not extensible(…)
a[0] = 1000;
console.log(a);   // [1, 2, 3, 4] <= No change!!

a_copy.push(900);
a_copy[0] = 600;
console.log(a_copy);  // [600, 2, 3, 4, 900]  <= We can mutate the copy!!
```

`Object.assign` is used to assign the values of `a` to an empty array which results in creating its copy which we call `a_copy`. Then we use `Object.freeze` to freeze our array `a` so that it can no longer be mutated.

### Structural Sharing

It seems to be a good idea to have **persistent immutable data structures** in JavaScript. Even though we can manually copy and freeze objects (as well as arrays and function) it would be still great to have some API that would enable us to use **immutable data structures**. The reason for that is because manual copying has the following problems:

  1. Might cost too much **memory** since we keep too many copies and,
  2. Too many **copy** operations is expensive.

However, we don't necessarily have to do expensive operations to cache the original data, instead we can have a smart implementation of an API that does all that very efficiently.
In fact **ImmutableJS** is a great example of such API which takes advantage of **structural sharing** implemented with **[Hash Map Tries](https://en.wikipedia.org/wiki/Hash_array_mapped_trie)** and **[Vector Tries](http://hypirion.com/musings/understanding-persistent-vector-pt-1)**.

### ImmutableJS API
ImmutableJS is a library which is inspired by the lack of **persistent** data structures and the difficulty of tracking mutation and maintaining state.
It provides the following data structures

- List
- Stack
- Map
- OrderedMap
- Set
- OrderedSet
- Record

### List
`List` can be used as an **array** but it behaves differently as we are going to see below. `List` exposes some useful methods such as `push`, `pop`, `set`, `delete`. For full documentation you can check the [documentation from Facebook](https://facebook.github.io/immutable-js/docs/#/List)

Here are some examples of how we can use `List`:
```js
// in ES6
import { List } from 'immutable';

let numbers = List.of(1, 2, 3, 4, 5);

let numbersUpdated = numbers.push(6); // 1, 2, 3, 4, 5, 6

// We can convert the List to JS array
console.log(numbers.toJS());        // 1, 2, 3, 4, 5
console.log(numbersUpdated.toJS()); // 1, 2, 3, 4, 5, 6
```
**[Run Code](http://jsfiddle.net/p0kywz66/)**

---
**Note:** We can't just `console.log(numbers)` since `numbers` is not an array. We can however use the `toJS()` method to convert any Immutable data structure to a JS equivalent, as in our case that would be a `List` to an `array`. Also, we can use the `toArray()` method.

---

It is important to distinguish the behaviour of `push` and `pop` between JS `Array` and `List`:

In **javascript** regular `Array`, `push` and `pop` return the element that was pushed/popped.
```js
var arr = [1, 2, 3];
var n1 = arr.push(4);

console.log(n1); // 4

var n2 = arr.pop();

console.log(n2); // 4
```

In `List` `push` and `pop` return the new mutated list.
```js
var list1 = List.of(1, 2, 3);
var list2 = list1.push(4);

console.log(list2.toArray()); // [1, 2, 3, 4]

var list3 = list2.pop();

console.log(list3.toArray()); // [1, 2, 3]
```
**[Run Code](http://jsfiddle.net/9ese0zvs/)**

### Map
Map is an unordered KeyedIterable of (key, value) pairs.
The order of iteration is undefined but stable. Multiple iterations of the same Map will iterate in the same order.

```js
let person1 = Map({
  name: 'John',
  age: '29',
  gender: 'male'
});


let printNext = (iterator) => {
  let el = iterator.next();
  if(!el.done) {
    console.log(el.value);
    printNext(iterator);
  }
}

let printKeys = (myMap) => {
  printNext(myMap.keys());
}

// the following two lines will print the keys of person1 in same order
printKeys(person1); // name, age, gender
printKeys(person1); // name, age, gender
```
**[Run Code](http://jsfiddle.net/ejdm05xg/)**

We can `set` and `update` values of a `Map`:
```js
// Set example 1
let person1 = Map({
  name: 'John',
  age: '29',
  gender: 'male',
  friends: List()
});

let person2 = person1.set('name', 'Mike');

console.log(person1.get('name')); // John
console.log(person2.get('name')); // Mike

```
**[Run Code](http://jsfiddle.net/twy09d2z/)**

We can introduce a new key-value pair with `set`.
```js
// Set example 2
let person1 = Map({
  name: 'John',
  age: '29',
  gender: 'male',
  friends: List()
});

let person2 = person1.set('birthday', 'Nov,03,1988');

console.log(person1.get('birthday')); // undefined
console.log(person2.get('birthday')); // Nov,03,1988

```
**[Run Code](http://jsfiddle.net/mo9t2wqy/)**

The `update` method requires an **updater** function:
```js
// Update example 1
let person1 = Map({
  name: 'John',
  age: '29',
  gender: 'male',
  friends: List()
});

let person2 = person1.update('name', (name) => name + ' Doe');

console.log(person1.get('name')); // John
console.log(person2.get('name')); // John Doe

```
**[Run Code](http://jsfiddle.net/gue282q8/)**

If we want to add *friends* to our `person1`, we can do that with an `updater`.
It is important to keep the immutability consistent by having the `friends` as a `List` of `Map`s instead of plain JS objects:

```js
// Update example 2
let person1 = Map({
  name: 'John',
  age: '29',
  gender: 'male',
  friends: List()
});

let person2 = person1.update('friends', (fs) =>
  fs.push(Map({
    name: 'Maria',
    age: 27,
    gender: 'female'
  })).push(Map({
    name: 'Petter',
    age: 32,
    gender: 'male'
  }))
);

console.log(person1.get('friends').toJS()); // []
console.log(person2.get('friends').toJS()); // we have 2 friends, see image below
```
**[Run Code](http://jsfiddle.net/t3L433ko/)**

![](https://raw.githubusercontent.com/rangle/react-workshop/immutable-writeup/handout/assets/debug-map-1.png)

To check the complete ImmutableJS API follow this [link](https://facebook.github.io/immutable-js/docs/#/).
You can play with ImmutableJS in the immutableJS and ES6 ready pen [here](http://codepen.io/andrejkn/pen/WQbKoE).

### Todo app with ReactJS and ImmutableJS

We can't make `this.state` *immutable* but it should be treated as such. However, in order to enforce immutable state we can augment `this.state` with a `Map` which in our case is `data`.
We can then put everything in this `data` `Map`. For example in our case we have a `List` of TODO items called `todoList`.
```js
constructor(props) {
  super(props);

  this.state = {
    data: Map({
      todoList: List()
    })
  };

  // ...
}
```
Before looking into the React component's state we should review the `setState` method. We can use `setState` in the following two ways:
```js
this.setState(newStateObject);
// ...
```
Or we can pass a callback which returns a new state:
```js
this.setState((previousState) => {
  let newState = {
    // ...
  };

  // ...
  return newState;
});
```
Since `this.state.data` contains our **immutable** state we can update the `data` `Map` in the following way:
```js
let updaterCallback = (k) => {
  // ... do something with k
  return newVal; // new value for the key k
};

this.setState((previousState) => ({
  data: previousState.data.update('someKey', updaterCallback)
}));
```
OR this would look cleaner by taking advantage of **ES6** deconstructing feature:
```js
this.setState(({data}) => ({
  data: data.update('someKey', updaterCallback)
}));
```

Here is how we can add a **TODO item** to our immutable state by updating our `data` `Map` and pushing the `todo` item into the `todoList` `List`.
```js
_saveTodo(todo) {
  // ...
  this.setState(({data}) => ({
    data: data.update('todoList', (todoList) =>
      (todoList.push(Map({
        item: todo,
        selected: false
      }))
    ))
  }));
}
```

The following function `_completeTodo()` toggles a **todo item** from incomplete to completed and vice versa.

```js
_completeTodo(index) {
  // ...
  this.setState(({data}) => ({
    data: data.update('todoList', (todoList) => {
      let selectedItem = todoList.get(index);
      let selectedState = selectedItem.get('selected');
      let toggledItem = selectedItem.set('selected', !selectedState);
      return todoList.set(index, toggledItem);
    })
  }));
}
```

A `Map` also provides a `delete` method which we can use to **detele** an item from our TODO list:
```js
_deleteTodo(todoIndex) {
  // ...
  this.setState(({data}) => ({
    data: data.update('todoList', (todoList) =>
      todoList.delete(todoIndex))
  }));
}
```