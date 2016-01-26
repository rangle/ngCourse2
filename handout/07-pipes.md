<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Part 7: Pipes](#part-7-pipes)
  - [Using Pipes](#using-pipes)
  - [Passing Parameters](#passing-parameters)
  - [Chaining Pipes](#chaining-pipes)
  - [Custom Pipes](#custom-pipes)
  - [Stateful Pipes](#stateful-pipes)
  - [Async Pipe](#async-pipe)
  - [Implementing Stateful Pipes](#implementing-stateful-pipes)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Part 7: Pipes #

In Angular 2 along with a new component architecture we have a new way of filtering data pipes which replace filters from Angular 1.x. Most of the filters from Angular 1.x are carried over to pipes and there are some additions to that as well.  

## Using Pipes ##

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

## Custom Pipes ##

We can create custom pipes also similar to custom filters in Angular 1.x. Below is the example of Custom pipe implementation. 

```javascript
import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'length'})
export class LengthPipe implements PipeTransform {
  transform(value:string, args:string[]) : any {
    let displayMessage: boolean = Boolean(args[0]);
    return displayMessage ? `${value} ${value.length}` : `${value.length}`
  }
}
```
[View Example](http://plnkr.co/edit/QrOAQL?p=preview)

Each custom pipe implementation must:

* Have `@Pipe` decorator with pipe metadata
* Implement the PipeTransform interface's with transform method that takes an input value and an optional array of parameter strings and returns the transformed value
* There will be one item in the parameter array for each parameter passed to the pipe
* We tell Angular that this is a pipe by applying the @Pipe decorator which we import from the core Angular library
* The `@Pipe` decorator takes an object with a name property whose value is the pipe name that we'll use within a template expression. It must be a valid JavaScript identifier. Our pipe's name is LengthPipe

```javascript
import {Component} from 'angular2/core';
import {LengthPipe} from './length.pipe';

@Component({
	selector: 'Hello',
	template: '<div><p>{{ message | length:true}}</p><p>{{ message | length:false}}</p></div>',
	pipes: [LengthPipe]
})
export class Hello {
  message: string = 'Hello There';
}
```
[View Example](http://plnkr.co/edit/QrOAQL?p=preview)

## Stateful Pipes ##

There are two categories of pipes, stateless and stateful.

Stateless pipes are pure functions that flow input data through without remembering anything or causing detectable side-effects. Most pipes are stateless. The `CurrencyPipe` we used and the length pipe we created both are examples of a stateless pipe.

Stateful pipes are those which can manage the state of the data they transform. A pipe that creates an HTTP request, stores the response and displays the output, is a stateful pipe. Stateful Pipes should be used cautiously.

Angular 2 provides two stateful pipes `AsyncPipe` and `JsonPipe`.

## Async Pipe ##

AsyncPipe can receive a Promise or Observable as input and subscribe to the input automatically, eventually returning the emitted value(s). It is stateful because the pipe maintains a subscription to the input and its returned values depend on that subscription.

```javascript
import {Component} from 'angular2/core';
@Component({
  selector: 'product-price',
  template: '<p>Total price of product is {{fetchPrice | async | currency:"CAD":true:"1.2-2"}}</p>'
})
export class ProductPrice {
  fetchPrice:Promise<number> = new Promise((resolve, reject) => {
    setTimeout(() => resolve(10), 500);
  });
}
```
[View Example](http://plnkr.co/edit/vUi8SukIryapeIkHwyZj?p=preview)

## Implementing Stateful Pipes ##

Pipes are stateless by default. We must declare a pipe to be stateful by setting the pure property of the `@Pipe` decorator to false. This setting tells Angular’s change detection system to check the output of this pipe each cycle, whether its input has changed or not.

```javascript
import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({
  name: 'delay',
  pure: false
})
export class DelayPipe  implements PipeTransform{
  
  private fetchedValue:number;
  private fetchPromise:Promise<number>;

  transform(value:number, args:string[]):number {
    if (!this.fetchPromise) {
      this.fetchPromise = new Promise<number>((resolve, reject) => {
        setTimeout(() => resolve(value * 1000), value * 500);
      });
      
      this.fetchPromise.then((val:number)   => this.fetchedValue = val);
    }
    return this.fetchedValue;
  }
}

```
[View Example](http://plnkr.co/edit/ujNLTmuQRw8UH0ujHz8Z?p=preview)
