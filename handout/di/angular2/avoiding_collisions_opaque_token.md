# Avoiding Injection Collisions: OpaqueToken

One of the potential issues with dependency injection is the case where different modules are using the same symbol to represent different entities. If we passed in a string to `@Inject` for example, we could potentially have two different entities that aren't aware of each other with the same identifier to Angular's DI. When it comes time to inject one of the entities, we could be using the wrong value without knowing it. While this behaviour might be difficult to run into or easy to resolve within a project, fixing this problem when we start working with 3rd party modules and services is another issue. This is where Angular's `OpaqueToken` comes into play.

`OpaqueToken`s are unique and immutable values that allow module providers to avoid DI collision issues.

```
import { OpaqueToken } from '@angular/core';

const name = 'token';
const token1 = new OpaqueToken(name);
const token2 = new OpaqueToken(name);

console.log(token1 === token2); // false
```

In this example, regardless of whether or not the same value is passed to the constructor of the token, it will not generate the same result. Consider this example of two "third party" modules that are both looking for api configs.


