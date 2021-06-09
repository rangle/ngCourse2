# Replacing Services with TypeScript Classes

Early AngularJS applications predate the widespread use of module loaders. The strategy of this era was to concatenate source files and rely on AngularJS's dependency injection as a poor-man's module loader. Often services were used to house _libraries_ instead of _stateful services_.

During conversion, we will introduce Webpack as a module loader. For services that lack state and don't heavily rely on other dependency injected services, we recommend rewriting them using TypeScript modules. The advantages of writing code this way are:

- It becomes framework agnostic \(doesn't rely on AngularJS explicitly\)
- It is easier to test
- It instantly works with both AngularJS and Angular

Even services that depend on a limited set of AngularJS services \(e.g. `$http`\) can be rewritten by depending on other libraries \(e.g. `window.fetch`\).

## How do we get there?

- Convert services using `.factory` to `.service`

  - Angular's `@Injectable` expects an object it can use `new` with,

    similar to how `.service` works \(e.g. `new CalculatorService()`\)

- Replace constructor functions with classes using the `class` keyword.
- Use the class directly by `export`ing it.

## Example

### `.factory` original

```javascript
angular.module("calcapp", []).factory("CalculatorService", function () {
  return {
    square: function (a) {
      return a * a;
    },
    cube: function (a) {
      return a * a * a;
    },
  };
});
```

### Conversion to `.service`

```javascript
angular.module("calcapp", []).service("CalculatorService", function () {
  this.square = function (a) {
    return a * a;
  };

  this.cube = function (a) {
    return a * a * a;
  };
});
```

### Conversion to TypeScript class
Also add type information to all methods to make the services safer and easier to use.
```javascript
class CalculatorService {
  square(a: number) {
    return a * a;
  }

  cube(a: number) {
    return a * a * a;
  }
}

angular.module("calcapp", []).service("CalculatorService", CalculatorService);
```

### Skip the middleman

```javascript
export class CalculatorService { ... }

// elsewhere
import {CalculatorService} from './calculator.service';
```
