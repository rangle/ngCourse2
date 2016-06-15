# Using Observables From Other Sources
In the example above we have been creating observables from scratch which is especially useful in understanding the anatomy of an observable.

However, a lot of the times we will create observables from callbacks, promises, events, collections or using many of the operators available on the API.


## Observable HTTP Events
A common operation in any web application is getting or posting data to a server. Angular applications do this with the `Http` library, which previously utilized `Promises` to operate in an asynchronous manner. The updated `Http` library now incorporates Observables for triggering events and getting new data. Lets take a quick look at this:

```js
import {Component} from '@angular/core';
import {Http} from '@angular/http';

@Component({
	selector: 'app',
	template: `
	  <b>Angular 2 HTTP requests using RxJs Observables!</b>
	  
	  <ul>
	    <li *ngFor="let doctor of doctors">{{doctor}}</li>
	  </ul>
	  `
})

export class App {
  constructor(http: Http) {
    http.get('http://jsonplaceholder.typicode.com/posts/1')
        .subscribe((data) => {
            this.response = data._body;
        })
  }
}
```
[View Example](http://plnkr.co/edit/FjJz4lTX2hhHkMu87cln?p=preview)

This basic examples outlines how the `Http` libraries common routines like `get`, `post`, `put`, and `delete` all return Observables that allow us to asynchronously process any resulting data. 


## Observable Form Events
Lets take a look at how Observables are used in Angular 2 forms. Each field in a form is treated as an Observable that we can subscribe to and listen for any changes made to the value of the input field. 

```js
import {Component} from '@angular/core';
import {Control, ControlGroup, FormBuilder} from '@angular/common';

@Component({
	selector: 'app',
	template: `
	  <form [ngFormModel]="coolForm"><input ngControl="email"></form>
	  <div><b>You Typed:</b> {{data}}</div>
	`
})

export class App {

	email: Control;
	coolForm: ControlGroup;
	data: string;

	constructor(private fb: FormBuilder) {
		this.email = new Control();

		this.coolForm = fb.group({
			email: this.email
		});

		this.email.valueChanges
		    .subscribe(value => this.data = value);
	}
}
```
[View Example](http://plnkr.co/edit/jEQ6o6D81c65mr9sghL3?p=preview)

Here we have created a new form by initializing a new `Control` field and grouped it into a `ControlGroup` tied to the `coolForm` HTML form. The `Control` field has a property `.valueChanges` that return an Observable that we can subscribe to. Now whenever a user types something into the field we'll get it immediately.

