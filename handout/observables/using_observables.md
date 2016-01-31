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

<iframe style="width: 100%; height: 600px" src="http://embed.plnkr.co/t5d9XAdgPAk8Y2grjW5p" frameborder="0" allowfullscren="allowfullscren"></iframe>

First we import `Observable` into our component from `rxjs/Observable`. Next, in our constructor we create a new `Observable`. Note that this creates an `Observable` data type that is cast as an array that contains data of `number` type. This illustrates the array driven stream of data that Observables offer as well as giving us the ability to maintain integrity of the type of data we are expecting to receive. 

Next we call `subscribe` on this Observable which allows us to listen in on any data that is coming through. In subscribing we utilize three distinctive callbacks, the first one is invoked when receiving new values, the second for any errors that arise, and the last represents the function to be invoked when the sequence of incoming data is complete. 

We can also use `forEach` to listen for incoming data. The key difference between `forEach` and `subscribe` is that `forEach` will block the current thread until the iteration sequence completes, in other words - `forEach` is synchronous and `subscribe` is asynchronous. Lets look at an example of using `forEach`: 

```js
export class AppComponent {
  
  private data:Observable<Array<number>>;
  private values:Array<number> = [];
  private status:string;

	constructor() {

		this.data = new Observable(observer => {
			setTimeout(() => {
				observer.next(42);
				observer.next(43);
				observer.complete();
			}, 2000);

			this.status = "Started";
		});

		this.data.forEach(
			value => this.values.push(value)
		);
		
		this.status = "Ended";
	}

}
```
[View Example](http://plnkr.co/edit/IXEellg8dF0ZnzIc2Cqa)

An important thing to note here is that `forEach` doesn't suspend execution while waiting for incoming data, it only begins to block the thread when it actually performs the iteration over each new item of data. So in the example above, you should see the status 'Ended' before you see any values. You'll notice that `forEach` doesn't have the same callback routines we used in `subscribe`. In fact, there is only one callback here and it is invoked whenever a new item comes through the stream. Since `forEach` is synchronous there is no need for a callback invoked on completion, and error handling can be used by wrapping the `forEach` in a try/catch statement. In most cases we would want to use `subscribe` for its asynchronous properties, but there may be some special cases where using `forEach` makes sense. 

