# Disposing Subscriptions and Releasing Resources 

In some scenarios we may want to unsubscribe from an `Observable` stream. Doing this is pretty straightforward as the `.subscribe()` call returns a data type that we can call `.unsubscribe()` on. 

```js
export class MyApp {
  
  private data: Observable<Array<string>>;
  private value: string;
  private subscribed: boolean;
  private status: string;

	init() {

		this.data = new Observable(observer => {
			let timeoutId = setTimeout(() => {
				observer.next('You will never see this message');
			}, 2000);
			
			this.status = 'Started';
			
			return onUnsubscribe = () => {
				this.subscribed = false;
				this.status = 'Finished';
				clearTimeout(timeoutId);
			}
		});

		let subscription = this.data.subscribe(
			value => this.value = value,
			error => console.log(error),
			() => this.status = 'Finished';
		);
		this.subscribed = true;
		
		setTimeout(() => {
		  subscription.unsubscribe();
		}, 1000);
	}

}
```
[View Example](http://plnkr.co/edit/vobR7i?p=preview)

<iframe class="no-pdf" style="width: 100%; height: 300px" src="http://embed.plnkr.co/vobR7i/" frameborder="0" allowfullscren="allowfullscren"></iframe>

Calling `.unsubscribe()` will unhook a member's callbacks listening in on the `Observable` stream. When creating an `Observable` you can also return a custom callback, `onUnsubscribe`,  that will be invoked when a member listening to the stream has unsubscribed. This is useful for any kind of cleanup that must be implemented. If we did not clear the setTimeout then values would still be emitting, but there would be no one listening. To save resources we should stop values from being emitted. An important thing to note is that when you call `.unsubscribe()` you are destroying the subscription object that is listening, therefore the on-complete event attached to that subscription object will not get called. 

In most cases we will not need to explicitly call the `unsubscribe` method unless we want to cancel early or our `Observable` has a longer lifespan than our subscription. The default behavior of `Observable` operators is to dispose of the subscription as soon as `.complete()` or `.error()` messages are published. Keep in mind that RxJS was designed to be used in a "fire and forget" fashion most of the time. 
