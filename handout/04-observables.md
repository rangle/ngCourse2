<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Part 4: Observables](#part-4-observables)
  - [Using Observables](#using-observables)
- [Angular 2 Component Using Observables!](#angular-2-component-using-observables)
  - [Error Handling](#error-handling)
  - [Disposing Subscriptions and Releasing Resources](#disposing-subscriptions-and-releasing-resources)
  - [Observables vs. Promises](#observables-vs-promises)
  - [Using Observables From Other Sources](#using-observables-from-other-sources)
    - [Observable Form Events](#observable-form-events)
    - [Observable HTTP Events](#observable-http-events)
- [Angular 2 Component using Observables!](#angular-2-component-using-observables)
  - [Observables Array Operations](#observables-array-operations)
  - [Combining Streams with `flatMap`](#combining-streams-with-flatmap)
  - [Cold vs. Hot Observables](#cold-vs-hot-observables)
  - [Summary](#summary)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Part 4: Observables

One of the new improved features introduced in Angular 2 are Observables. Observables aren't an Angular 2 specific feature, its a proposed standard for managing async data and that will be included in the release of ES7. Observables are similar to Promises, but differ in a few major ways. Perhaps the biggest difference is that Observables open up a continuos channel of communication in which multiple values of data can be emitted over time. From this we get a pattern of dealing with data by using array like operations to parse, modify and maintain data. Angular 2 uses Observables extensively, you'll see them in the HTTP service and the event system. 

## Using Observables

Lets take a look at a basic example of how to create and use an Observable in an Angular 2 component

```ts
import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Observable';


@Component({
	selector: 'app-root',
	template: '<h1>Angular 2 Component Using Observables!</h1>'
})

export class AppComponent {
	
	private data:Observable<Array<any>>;

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
			value => console.log('Value: ' + value),
			error => console.log(error),
			() => console.log('Completed Observable sequence!')
		);
	}
}
```
[View Example](http://plnkr.co/edit/xbcD8nQJwZ7E3btn2015)

First we import `Observable` into our component from `rxjs/Observable`. Next, in our constructor we create a new `Observable`. Note that this creates an `Observable` data type that is cast as an array that contains data of `any` type. This illustrates the array driven stream of data that Observables offer. 

Next we call `subscribe` on this Observable which allows us to listen in on any data that is coming through. In subscribing we utilize three distinctive callbacks, the first one is invoked when receiving new values, the second for any errors that arise, and the last represents the function to be invoked when the sequence of incoming data is complete. 

We can also use `forEach` to listen for incoming data. The key difference between `forEach` and `subscribe` is that `forEach` will block the current thread until the iteration sequence completes, in other words - `forEach` is synchronous and `subscribe` is asynchronous. Lets look at an example of using `forEach`: 

```ts
export class AppComponent {
	
	private data:Observable<Array<any>>;

	constructor() {

		this.data = new Observable(observer => {
			setTimeout(() => {
				observer.next(42);
				observer.next(43);
				observer.complete();
			}, 2000);

			console.log('Started Observable sequence!');
		});

		this.data.forEach(
			value => console.log('Value: ' + value)
		);
		
		console.log('Completed Observable sequence!');
	}
}
```
[View Example](http://plnkr.co/edit/PTAo3GIFBQQ3CzQuwyFG)

An important thing to note here is that `forEach` doesn't suspend execution while waiting for incoming data, it only begins to block the thread when it actually performs the iteration over each new item of data. So in the example above, you should see the message 'Completed Observable sequence!' before you see any values. You'll notice that `forEach` doesn't have the same callback routines we used in `subscribe`. In fact, there is only one callback here and it is invoked whenever a new item comes through the stream. Since `forEach` is synchronous there is no need for a callback invoked on completion, and error handling can be used by wrapping the `forEach` in a try/catch statement. In most cases we would want to use `subscribe` for its asynchronous properties, but there may be some special cases where using `forEach` makes sense. 

## Error Handling

If something unexpected arises we can raise an error on the Observable stream and use the function reserved for handling errors in our `subscribe` routine to see what happened.

```ts
export class AppComponent {
	
	private data:Observable<Array<any>>;

	constructor() {

		this.data = new Observable(observer => {
			setTimeout(() => {
				observer.error('Hey something bad happened I guess');
			}, 2000);

			console.log('Started Observable sequence!');
		});

		let subscription = this.data.subscribe(
			value => console.log('Value: ' + value),
			error => console.log(error),
			() => console.log('Completed Observable sequence!')
		);
	}
}
```
[View Example](http://plnkr.co/edit/aRkwCFAJRBy9Fi6v0Vtx)

Here an error is raised, and caught. One thing to take note of is if we included a `.complete()` after we raised the error this event will not actually fire. Therefore you should remember to include some call in your error handler that will turn off any visual loading states in your application. 

## Disposing Subscriptions and Releasing Resources 
In some scenarios we may want to unsubscribe from an Observable stream. Doing this is pretty straightforward as the `.subscribe()` call returns a data type that we can call `.unsubscribe` on. 

```ts
export class AppComponent {
	
	private data:Observable<Array<any>>;

	constructor() {

		this.data = new Observable(observer => {
			let timeoutId = setTimeout(() => {
				observer.next("You'll never see this message");
			}, 2000);

			console.log('Started Observable sequence!');
			
			return onUnsubscribe = () => {
				console.log('Unsubscribed from Observable sequence!');
				clearTimeout(timeoutId);
			}
		});

		let subscription = this.data.subscribe(
			value => console.log('Value: ' + value),
			error => console.log(error),
			() => console.log('Completed Observable sequence!')
		);
	}
}
```
[View Example](http://plnkr.co/edit/iBDkFH6lAhKKDwMomG2x)

Calling `.unsubscribe` will unhook a members callbacks listening in on the Observable stream. When creating an Observable you can also return a custom callback, `onUnsubscribe`,  that will be invoked when a member listening to the stream has unsubscribed. This is useful for any kind of clean up that needs to be implemented. If we did not clear the setTimeout then values would still be emitting, there would just be no one listening. To save resources we should do whatever it takes to stop values from being emitted. 

In most cases we will not need to explicitly call the `unsubscribe` method unless we want to cancel early or our Observable has a longer life span than our subscription. The default behaviour of a Observable operators is to dispose of the subscription as soon as `.complete()` or `.error()` messages are published. Keep in mind that RxJS was designed to be used in a "fire and forget" fashion most of the time. 

## Observables vs. Promises
Both promises and observables provide us with abstractions that help us deal with the asynchronous nature of our applications. However, there are important differences between the two.

- As seen in the example above, observables can define both the setup and teardown aspects of asynchronous behaviour. Observables are cancellable.
- Moreover, Observables can be retried using one of the retry operators provided by the API, such as `retry` and `retryWhen`. On the other hand in the case of promises, the caller must have access to the original function that returned the promise in order to have a retry capability.

## Using Observables From Other Sources
In the example above we have been creating observables from scratch which is especially useful in understanding the anatomy of an observable.

However, a lot of the times we will create observables from callbacks, promises, events, collections or using many of the operators available on the API.

### Observable Form Events
Lets take a look at how Observables are used in Angular 2 forms. Each field in a form is treated as an Observable that we can subscribe to and listen for any changes made to the value of the input field. 

```ts
import {Component} from 'angular2/core';
import {Control, ControlGroup, FormBuilder} from 'angular2/common';


@Component({
	selector: 'app-root',
	template: '<form [ngFormModel]="coolForm"><input ngControl="email"></form>'
})

export class AppComponent {

	email:Control;
	coolForm:ControlGroup;

	constructor(private fb: FormBuilder) {
		this.email = new Control();

		this.coolForm = fb.group({
			email: this.email
		});

		this.email.valueChanges.subscribe(value => console.log(value));
	}
}
```
[View Example](http://plnkr.co/edit/VNYhtBgjeg5evfe9L8O7)

Here we have created a new form by initializing a new `Control` field and grouped it into a `ControlGroup` tied to the `coolForm` HTML form. The `Control` field has a property `.valueChanges` that return an Observable that we can subscribe to. Now whenever a user types something into the field we'll get it immediately. 

### Observable HTTP Events
A common operation in any web application is getting or posting data to a server. Angular application do this with the `Http` library, which previously utilized `Promises` to operate in an asynchronous manner. The updated `Http` library now incorporates Observables for triggering events and getting new data. Lets take a quick look at this:

```ts
import {Component} from 'angular2/core';
import {Http} from 'angular2/http';


@Component({
	selector: 'app-root',
	template: '<h1>Angular 2 Component using Observables!</h1>'
})

export class AppComponent {

	constructor(private http:Http) {
		http.get('example.json').subscribe((data) => {
			this.data = data;
		});
	}
}
```
This basic examples outlines how the `Http` libraries common routines like `get`, `post`, `put`, and `delete` all return Observables that allow us to asynchronously process any resulting data. 


## Observables Array Operations
In addition to simply iterating over an asynchronous collection, we can perform other operations such as filter or map and many more as defined in the RxJS API. This is what bridges observable with the Iterable pattern, and lets us conceptualize them as collections.

Let's expand our example and do something a little more with our stream:

```ts
export class AppComponent {

	constructor(private http:Http) {
		http.get('people.json')
			.map((result) => result.json())
			.filter(person => person.age > 18)
			.subscribe((data) => {
				this.data = data;
			});
	}
}
```
Here are two really useful array operations - `map` and `filter`. What exactly do these do?

`map` will create a new array with the results of calling a provided function on every element in this array. In this example we have used it to create a new result set by iterating through each item and converting into a JSON object. Now our result set contains JSON items. 

`filter` will create a new array with all elements that pass the test implemented by a provided function. Here we have used it to create a new result set by excluding any item whose `age` property is less than 18. 

Now when our `subscribe` callback gets invoked, the data it receives will be a list of JSON objects with every item's `age` property greater or equal to 18. 

Note the chaining function style, and the optional static typing that comes with TypeScript we have used in this example. Most Importantly functions like filter return an observable, as in observables beget other observables, similarly to promises.

There are many other array operations you can employ in your Observables, look for them in the [RxJS API](https://github.com/Reactive-Extensions/RxJS). 

## Combining Streams with `flatMap`
Lets say we wanted to implement an AJAX search feature in which every keypress in a text field by the user will automatically perform a search and update the page with the results. How would this look? Well we would have an Observable subscribed to events coming from an input field, and on every change of input we want to perform a some http request, which is also an Observable we subscribe to. What we end up with is an Observable of an Observable. 

By using `flatMap` we can transform our event stream (the keypress events on the text field) into our response stream (the search results from the http request). 

*app/services/Search.ts* 

```ts
import {Http} from 'angular2/http';

@Injectable()
export class SearchService {
	constructor (private http: Http) {}
	
	search(term: String) {
		return this.http
				   .get('http://example.com/search?=' + term)
				   .map((response) => response.json());
	}
}
		
```
Here we have a basic service that will undergo a search query by performing a get request with a supplied search term. This `search` function returns an Observable that has had some basic post-processing done (turning the response into a JSON object). 

OK, lets take a look at the Component that will be using this service. 

*app/app.ts*

```ts
import {Component} from 'angular2/core';
import {Control, ControlGroup, FormBuilder} from 'angular2/common';
import {SearchService} from './services/Search';

@Component({
	selector: 'app-root',
	template: '
		<form [ngFormModel]="coolForm"><input ngControl="search"></form>
		<pre>{{result}}</pre>
	'
})

export class AppComponent {
	searchField:Control;
	coolForm:ControlGroup;
	
	constructor(private fb:FormBuilder, private searchService:SearchService) {
		this.searchField = new Control();
		this.coolForm = fb.group({
			search: this.searchField
		});
		
		this.searchField.valueChanges
						.debounceTime(400)
						.flatMap(term => this.searchService.search(term))
						.subscribe(result => this.result = result);
	}
}
```

Here we have setup a basic form with a single field - `searchField`, which we subscribe to for event changes. We've also setup a simple binding for any results coming from the SearchService. The real magic here is `flatMap` which allows us to flatten our two separate subscribed Observables into a single cohesive stream we can use to control events coming from user input and from server responses. 

Note that flatMap flattens a stream of observables (i.e observable of observables) to a stream of emitted values (a simple observable), by emitting on the "trunk" stream everything that will be emitted on "branch" streams.

## Cold vs. Hot Observables
Observables can be classified into 2 main groups, Hot and Cold Observables. Let's start with a cold Observable. 

```ts
export class AppComponent {
	
	private data:Observable<Array<any>>;

	constructor() {

		this.data = new Observable(observer => {
			setTimeout(() => {
				observer.next('First value');
			}, 1000);

			setTimeout(() => {
				observer.next('Second value');
			}, 3000);
		});

		setTimeout(() => {
			this.data.subscribe(
				value => console.log('Value (Observable 1): ' + value)
			);
		}, 0);

		setTimeout(() => {
			this.data.subscribe(
				value => console.log('Value (Observable 2): ' + value)
			);
		}, 2000);
	}
}
```
[View Example](http://plnkr.co/edit/q6wN5f1jd2MVQWcoN0QT)

In the above case subscriber B subscribes 2000ms after subscriber A. Yet subscriber B is starting to get values like subscriber A only time shifted. This behaviour is referred to as a Cold Observable. A useful analogy is watching a pre-recorded video, let's say on Netflix. You press play and the movie starts playing from the beginning. Someone else, can start playing the same movie in their own home 25 minutes later.

On the other hand there is also a Hot Observable, which is more like a live performance. You attend a live band performance from the beginning, but someone else might be 25 minutes late to the show. The band will not start playing from the beginning and you have to start watching the performance from where it is.

We have already encountered both kind of observables, the example above is a cold observable, while an example that uses `valueChanges` on our text field input is a hot observable.


## Summary
Observables offer a flexible set of APIs for composing and transforming asynchronous streams. It provides multitude of function to create stream from absolutely anything and more to manipulate and transform them. We've taken a look at how Angular 2 utilizes Observables to read user input, perform asynchronous data fetches, and setup custom emit/subscribe routines. 