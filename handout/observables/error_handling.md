# Error Handling

If something unexpected arises we can raise an error on the Observable stream and use the function reserved for handling errors in our `subscribe` routine to see what happened.

```js
export class AppComponent {
	
	private data:Observable<Array<number>>;
	private values:Array<number> = [];
	private anyErrors:error;

	constructor() {

		this.data = new Observable(observer => {
			setTimeout(() => {
				observer.error('Hey something bad happened I guess');
			}, 2000);
		});

		let subscription = this.data.subscribe(
			value => this.values.push(value),
			error => this.anyErrors = error
		);
	}
}
```
[View Example](http://plnkr.co/edit/rlenWNFGveWnqZfFsCkQ)

<iframe style="width: 100%; height: 300px" src="http://embed.plnkr.co/rlenWNFGveWnqZfFsCkQ" frameborder="0" allowfullscren="allowfullscren"></iframe>

Here an error is raised, and caught. One thing to take note of is if we included a `.complete()` after we raised the error this event will not actually fire. Therefore you should remember to include some call in your error handler that will turn off any visual loading states in your application. 

