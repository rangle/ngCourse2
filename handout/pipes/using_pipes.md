# Using Pipes #

Like a filter, a pipe also takes data as input and transforms it to the desired output. A basic example of using pipes is shown below:

```javascript
import {Component} from '@angular/core';

@Component({
  selector: 'product-price',
  template: `<p>Total price of product is {{ price | currency }}</p>`
})
export class ProductPrice {
  price: number = 100.1234;
}
```
[View Example](http://plnkr.co/edit/JdiPRRHDxwTIMSQiWAC7?p=preview)

## Passing Parameters ##

A pipe can accept optional parameters to modify the output. To pass parameters to a pipe,
simply add a colon and the parameter value to the end of the pipe expression:

```
pipeName: parameterValue
```

You can also pass multiple parameters this way:

```
pipeName: parameter1: parameter2
```

```javascript
import {Component} from '@angular/core';

@Component({
	selector: 'product-price',
	template: '<p>Total price of product is {{ price | currency: "CAD": true: "1.2-4" }}</p>'
})
export class ProductPrice {
  price: number = 100.123456;
}
```
[View Example](http://plnkr.co/edit/HONbr4g33364pe9gmEmg?p=preview)

## Chaining Pipes ##

We can chain pipes together to make use of multiple pipes in one expression.

```javascript
import {Component} from '@angular/core';

@Component({
	selector: 'product-price',
	template: '<p>Total price of product is {{ price | currency: "CAD": true: "1.2-4" | lowercase }}</p>'
})
export class ProductPrice {
  price: number = 100.123456;
}
```
[View Example](http://plnkr.co/edit/bLcGKKeB6spJ3m7HwBBy?p=preview)
