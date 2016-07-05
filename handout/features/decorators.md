# Decorators

Decorators are proposed for a future version of JavaScript, but
the Angular 2 team _really_ wanted to use them, and they have been included in
TypeScript.

Decorators are functions that are invoked with a prefixed `@` symbol, and
_immediately_ followed by a `class`, parameter, method or property.  The 
decorator function is supplied information about the `class`, parameter or
method, and the decorator function returns something in its place, or
manipulates its target in some way.  Typically the "something" a decorator
returns is the same thing that was passed in, but it has been augmented in some 
way.

Decorators are quite new in TypeScript, and most use cases demonstrate the
use of existing decorators. However, decorators are just functions, and are
easier to reason about after walking through a few examples.

Decorators are functions, and there are four things (`class`, parameter,
method and property) that can be decorated; consequently there are four
different function signatures for decorators:

- class: `declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;`
- property: `declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;`
- method: `declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;`
- parameter: `declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;`

Readers who have played with Angular 2 will notice that these signatures do
not look like the signatures used by Angular 2 specific decorators like
`@Component()`.
 
Notice the `()` on `@Component`.  This means that the `@Component` is
called once JavaScript encounters `@Component()`.  In turn, this means that
there must be a `Component` function somewhere that returns a function matching
one of the decorator signatures outlined above.

If decorators still look confusing, perhaps some examples will clear things up.
