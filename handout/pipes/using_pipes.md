# Using Pipes #

Like a filter, a pipe also takes data as input and transforms it to the desired output. A basic example of using pipes is shown below.

```javascript
import {Component} from 'angular2/core'
@Component({
  selector: 'product-price',
  template: `<p>Total price of product is {{ price | currency }}</p>`
})
export class ProductPrice {
  price: number = 100.1234;
}
```
[View Example](http://plnkr.co/edit/GjCobrLKs1XtDHA3ancy?p=preview)

## Passing Parameters ##

A pipe can accept optional parameters to modify the output. To add the parameters to pipe add colon(:) after the pipe name followed by the parameter value `pipeName:parameterValue`. If there are multiple parameters separate them with colons `pipeName:parameter1:parameter2`.

```javascript
import {Component} from 'angular2/core';

@Component({
	selector: 'product-price',
	template: '<p>Total price of product is {{ price | currency:"CAD":true:"1.2-4"}}</p>'
})
export class ProductPrice {
  price: number = 100.123456;
}
```
[View Example](http://plnkr.co/edit/z2mCGyJzR5zNPof3q5C4?p=preview)

## Chaining Pipes ##

We can chain pipes together to make use of multiple pipes in one expression.

```javascript
import {Component} from 'angular2/core';

@Component({
	selector: 'product-price',
	template: '<p>Total price of product is {{ price | currency:"CAD":true:"1.2-4" | lowercase}}</p>'
})
export class ProductPrice {
  price: number = 100.123456;
}
```
[View Example](http://plnkr.co/edit/s1cvu5yhfOnoDRngHXe4?p=preview)


