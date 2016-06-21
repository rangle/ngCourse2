# TypeScript Classes

TypeScript also treats `class`es as their own type:

```js
class Foo { foo: number; }
class Bar { bar: string; }

class Baz { 
  constructor(foo: Foo, bar: Bar) { }
}

let baz = new Baz(new Foo(), new Bar()); // valid
baz = new Baz(new Bar(), new Foo());     // tsc errors
```

Like function parameters, `class`es sometimes have optional members.  The same
`?:` syntax can be used on a `class` definition:

```js
class Person {
  name: string;
  nickName?: string;
}
```

In the above example, an instance of `Person` is guaranteed to have a `name`,
and might optionally have a `nickName`
