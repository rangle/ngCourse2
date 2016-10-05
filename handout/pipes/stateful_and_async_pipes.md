# Stateful Pipes ##

There are two categories of pipes:

* _Stateless_ pipes are pure functions that flow input data through without remembering anything or causing detectable side-effects. Most pipes are stateless. The `CurrencyPipe` we used and the length pipe we created are examples of a stateless pipe.

* _Stateful_ pipes are those which can manage the state of the data they transform. A pipe that creates an HTTP request, stores the response and displays the output, is a stateful pipe. Stateful Pipes should be used cautiously.

Angular 2 provides `AsyncPipe`, which is stateful.

## AsyncPipe ##

AsyncPipe can receive a `Promise` or `Observable` as input and subscribe to the input automatically, eventually returning the emitted value(s). It is stateful because the pipe maintains a subscription to the input and its returned values depend on that subscription.

```typescript
import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'product-price',
  template: `
    <p>Total price of product is {{fetchPrice | async | currency: "CAD": true: "1.2-2"}}</p>
    <p>Seconds: {{seconds | async}}</p>
  `
})
export class ProductPrice {
  count: number = 0;
  fetchPrice: Promise<number> = new Promise((resolve, reject) => {
    setTimeout(() => resolve(10), 500);
  });

  seconds: Observable<number> = new Observable(observer => {
    setInterval(() => { observer.next(this.count++); }, 1000);
  });
}

```
[View Example](http://plnkr.co/edit/YrJEE5UBTlZ8HtfMGfR2?p=preview)

## Implementing Stateful Pipes ##

Pipes are stateless by default. We must declare a pipe to be stateful by setting the pure property of the `@Pipe` decorator to false. This setting tells Angular’s change detection system to check the output of this pipe each cycle, whether its input has changed or not.

```typescript
import {Pipe, PipeTransform, ChangeDetectorRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/take';

/**
 * On number change, animates from `oldNumber` to `newNumber`
 */
// naive implementation assumes small number increments
@Pipe({
  name: 'animateNumber',
  pure: false
})
export class AnimateNumberPipe implements PipeTransform {
  private currentNumber: number = null; // intermediary number
  private newNumber: number = null;
  private subscription;
  
  constructor(private cdRef: ChangeDetectorRef) {}

  transform(newNumber: number): string {
    if (this.newNumber === null) { // set inital value
      this.currentNumber = this.newNumber = newNumber;
    }
    if (newNumber !== this.newNumber) {
      if (this.subscription) {
        this.currentNumber = this.newNumber;
        this.subscription.unsubscribe();
      }
      this.newNumber = newNumber;
      const oldNumber = this.currentNumber;
      const direction = ((newNumber - oldNumber) > 0) ? 1 : -1;
      const numbersToCount = Math.abs(newNumber - oldNumber) + 1;
      this.subscription = Observable.timer(0, 100) // every 100 ms
        .take(numbersToCount)
        .subscribe(
          () => {
            this.currentNumber += direction;
            this.cdRef.markForCheck();
          },
          null,
          () => this.subscription = null
        );
    }

    return this.currentNumber;
  }
}

```
[View Example](http://plnkr.co/edit/PQwaKTYeUXWdS3mm2ojY?p=preview)
