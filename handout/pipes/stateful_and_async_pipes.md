# Stateful Pipes ##

There are two categories of pipes, stateless and stateful.

Stateless pipes are pure functions that flow input data through without remembering anything or causing detectable side-effects. Most pipes are stateless. The `CurrencyPipe` we used and the length pipe we created both are examples of a stateless pipe.

Stateful pipes are those which can manage the state of the data they transform. A pipe that creates an HTTP request, stores the response and displays the output, is a stateful pipe. Stateful Pipes should be used cautiously.

Angular 2 provides `AsyncPipe`, which is stateful.

## Async Pipe ##

AsyncPipe can receive a Promise or Observable as input and subscribe to the input automatically, eventually returning the emitted value(s). It is stateful because the pipe maintains a subscription to the input and its returned values depend on that subscription.

```javascript
import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
@Component({
  selector: 'product-price',
  template: `<p>Total price of product is {{fetchPrice | async | currency:"CAD":true:"1.2-2"}}</p>
  <p> Seconds: {{seconds | async}} </p>
  `
})
export class ProductPrice {
  count:number = 0;
  fetchPrice:Promise<number> = new Promise((resolve, reject) => {
    setTimeout(() => resolve(10), 500);
  });

  seconds:any = new Observable(observer => {
    setInterval(() => { observer.next(this.count++); }, 1000);
      });
}

```
[View Example](http://plnkr.co/edit/iV4XbNFjQInjgsmBmvcK?p=preview)

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
