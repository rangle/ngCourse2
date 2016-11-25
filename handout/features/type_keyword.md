# Type Keyword

The `type` keyword defines an alias to a type.

```typescript
type str = string;
let cheese: str = 'gorgonzola';
let cake: str = 10; // Type 'number' is not assignable to type 'string'
```

At first glance, this does not appear to be very useful (even the error mentions the original type), but as type annotations become more complex, the benefits of the `type` keyword become apparent.

### Union Types

Union types allow type annotations to specify that a property should be one of a set of types (either/or).
 
```typescript
function admitAge (age: number|string): string {
  return `I am ${age}, alright?!`;
}

admitAge(30); // 'I am 30, alright?!'
admitAge('Forty'); // 'I am Forty, alright?!'
```

The `type` keyword simplifies annotating and reusing union types.

```typescript
type Age = number | string;

function admitAge (age: Age): string {
  return `I am ${age}, alright?!`;
}

let myAge: Age = 50;
let yourAge: Age = 'One Hundred';
admitAge(yourAge); // 'I am One Hundred, alright?!'
```

A union type of string literal types is a very useful pattern, creating what is basically an enum with string values.

```typescript
type PartyZone = "pizza hut" | "waterpark" | "bowling alley" | "abandoned warehouse";

function goToParty (place: PartyZone): string {
  return `lets go to the ${place}`;
}

goToParty("pizza hut");
goToParty("chuck e. cheese"); // Argument of type `"chuck e. cheese"' is not assignable to parameter of type 'PartyZone'
```

### Intersection Types

Intersection types are the combination of two or more types. Useful for objects and params that need to implement more than one interface. 

```typescript
interface Kicker {
  kick(speed: number): number;
}

interface Puncher {
  punch(power: number): number;
}
// assign intersection type definition to alias KickPuncher
type KickPuncher = Kicker & Puncher;

function attack (warrior: KickPuncher) {
  warrior.kick(102);
  warrior.punch(412);
  warrior.judoChop(); // Property 'judoChop' does not exist on type 'KickPuncher'
}
```

### Function Type Definitions

Function type annotations can get much more specific than typescripts built-in `Function` type. Function type definitions allow you to attach a function signature
to it's own type.

```typescript
type MaybeError = Error | null;
type Callback = (err: MaybeError, response: Object) => void;

function sendRequest (cb: Callback): void {
  if (cb) {
    cb(null, {});
  }
}
```
The syntax is similar to ES6 fat-arrow functions. `([params]) => [return type]`.

To illustrate the how much the `type` keyword improved the readability of the previous snippet, here is the function type defined inline.

```typescript
function sendRequest (cb: (err: Error|null, response: Object) => void): void {
  if (cb) {
    cb(null, {});
  }
}
```

