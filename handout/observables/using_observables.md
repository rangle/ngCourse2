# Using Observables

Lets take a look at a basic example of how to create and use an Observable in an Angular 2 component

```js
import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
	selector: 'app',
	template: `
	  <b>Angular 2 Component Using Observables!</b>
	  <div>Values: {{values.toString()}}</div>
	  <div>Errors? {{anyErrors}}</div>
	  <div>Finished? {{finished}}</div>
	`
})
export class App {
  
  private data: Observable<Array<number>>;
  private values: Array<number> = [];
  private anyErrors: boolean;
  private finished: boolean;

  constructor() {
      this.data = new Observable(observer => {
          setTimeout(() => {
              observer.next(42);
          }, 1000);
          
          setTimeout(() => {
              observer.next(43);
          }, 2000);
          
          setTimeout(() => {
              observer.complete();
          }, 3000);
      });

      let subscription = this.data.subscribe(
          value => this.values.push(value),
          error => this.anyErrors = true,
          () => this.finished = true
      );
  }
  
}
```
[View Example](http://plnkr.co/edit/m7RX8IPJMtX2PTUyDDu1?p=preview)

<iframe style="width: 100%; height: 300px" src="http://embed.plnkr.co/m7RX8IPJMtX2PTUyDDu1/" frameborder="0" allowfullscren="allowfullscren"></iframe>

First we import `Observable` into our component from `rxjs/Observable`. Next, in our constructor we create a new `Observable`. Note that this creates an `Observable` data type that is cast as an array that contains data of `number` type. This illustrates the array driven stream of data that Observables offer as well as giving us the ability to maintain integrity of the type of data we are expecting to receive. 

Next we call `subscribe` on this Observable which allows us to listen in on any data that is coming through. In subscribing we utilize three distinctive callbacks, the first one is invoked when receiving new values, the second for any errors that arise, and the last represents the function to be invoked when the sequence of incoming data is complete. 

We can also use `forEach` to listen for incoming data. The key difference between `forEach` and `subscribe` is in how the error and completion callbacks are handled. The `forEach` call only accepts the 'next value' callback as an argument; it then returns a promise instead of a subscription.

When the observable completes, the promise resolves. When the observable encounters an error, the promise is rejected.

You can think of `Observable.of(1, 2, 3).forEach(doSomething)` as being semantically equivalent to:

```javascript
new Promise((resolve, reject) => {
  Observable.of(1, 2, 3).subscribe(
    doSomething,
    reject,
    resolve);
});
```

The `forEach` pattern is useful for a sequence of events you only expect to happen once. 

```js
export class App {
  
  private data: Observable<Array<number>>;
  private values: Array<number> = [];
  private anyErrors: boolean;
  private finished: boolean;

  constructor() {
      this.data = new Observable(observer => {
          setTimeout(() => {
              observer.next(42);
          }, 1000);
          
          setTimeout(() => {
              observer.next(43);
          }, 2000);
          
          setTimeout(() => {
              observer.complete();
          }, 3000);
          
          this.status = "Started";
      });

      let subscription = this.data.forEach(v => this.values.push(v))
		    .then(() => this.status = "Ended");
  }

}
```

[View Example](http://plnkr.co/edit/uHwCuarxgkFR3ig5IPkA?p=preview)

<iframe style="width: 100%; height: 300px" src="http://embed.plnkr.co/uHwCuarxgkFR3ig5IPkA/" frameborder="0" allowfullscren="allowfullscren"></iframe>
