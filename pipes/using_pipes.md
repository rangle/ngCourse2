# Using Pipes

Like a filter, a pipe also takes data as input and transforms it to the desired output. A basic example of using pipes is shown below:

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'product-price',
  template: `<p>Total price of product is {{ price | currency }}</p>`
})
export class ProductPrice {
  price = 100.1234;
}
```

[View Example](http://plnkr.co/edit/JIdYGCz1U9ElEpCArg01?p=preview)

## Passing Parameters

A pipe can accept optional parameters to modify the output. To pass parameters to a pipe, simply add a colon and the parameter value to the end of the pipe expression:

```text
pipeName: parameterValue
```

You can also pass multiple parameters this way:

```text
pipeName: parameter1: parameter2
```

```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: '<p>Total price of product is {{ price | currency: "CAD": true: "1.2-4" }}</p>'
})
export class AppComponent {
  price = 100.123456;
}
```

[View Example](http://plnkr.co/edit/IjGPii3n7qpezcglp03O?p=preview)

## Chaining Pipes

We can chain pipes together to make use of multiple pipes in one expression.

```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: '<p>Total price of product is {{ price | currency: "CAD": true: "1.2-4" | lowercase }}</p>'
})
export class ProductPrice {
  price = 100.123456;
}
```

[View Example](http://plnkr.co/edit/mnnujN8qPMfRzmNg4uo4?p=preview)

