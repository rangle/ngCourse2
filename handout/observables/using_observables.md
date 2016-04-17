# Using Observables

Lets take a look at a basic example of how to create and use an Observable in an Angular 2 component

```js
import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

@Component({
	selector: 'app-root',
	template: `
	  <b>Angular 2 Component Using Observables!</b>
	  <div>Values: {{values.toString()}}</div>
	  <div>Errors? {{anyErrors}}</div>
	  <div>Finished? {{finished}}</div>
	`
})
export class AppComponent {
  
  private data:Observable<Array<number>>;
  private values:Array<number> = [];
  private anyErrors:boolean = false;
  private finished:boolean = false;

  constructor() {
    
      this.data = new Observable(observer => {
          setTimeout(() => {
              observer.next(42);
              observer.next(43);
              observer.complete();
          }, 2000);

          console.log('Started Observable sequence!');
      });

      let subscription = this.data.subscribe(
          value => this.values.push(value),
          error => this.anyErrors = true,
          () => this.finished = true
      );
  }

}
```
[View Example](http://plnkr.co/edit/t5d9XAdgPAk8Y2grjW5p)

<iframe style="width: 100%; height: 300px" src="http://embed.plnkr.co/t5d9XAdgPAk8Y2grjW5p" frameborder="0" allowfullscren="allowfullscren"></iframe>

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
export class AppComponent {
  private data:Observable<Array<number>>;
  private values:Array<number> = [];
  private status:string;
  private subscribeValues

	constructor() {
		this.data = new Observable(observer => {
			setTimeout(() => {
				observer.next(42);
			  observer.next(43);
        observer.complete();
      }, 2000);

			this.status = "Started";
		});

		this.data.forEach(value => this.values.push(value))
      .then(
        () => this.status = "Ended",
        () => this.status = "Failed");
	}
}
```

[View Example](http://plnkr.co/edit/UXoBdOzNeR7D1t4CIPMS)

<iframe style="width: 100%; height: 300px" src="http://plnkr.co/edit/UXoBdOzNeR7D1t4CIPMS" frameborder="0" allowfullscren="allowfullscren"></iframe>
