# Error Handling

If something unexpected arises we can raise an error on the `Observable` stream and use the function reserved for handling errors in our `subscribe` routine to see what happened.

```js
export class App {

	values: number[] = [];
	anyErrors: Error;
	private data: Observable<number[]>;

	constructor() {

		this.data = new Observable(observer => {
		  	setTimeout(() => {
				observer.next(10);
			}, 1500);
			setTimeout(() => {
				observer.error(new Error('Something bad happened!'));
			}, 2000);
			setTimeout(() => {
				observer.next(50);
			}, 2500);
		});

		let subscription = this.data.subscribe(
			value => this.values.push(value),
			error => this.anyErrors = error
		);
	}
}
```
[View Example](http://plnkr.co/edit/Kye130?p=preview)

Here an error is raised and caught. One thing to note is that if we included a `.complete()`
after we raised the error, this event will not actually fire.
Therefore you should remember to include some call in your error handler
that will turn off any visual loading states in your application.
