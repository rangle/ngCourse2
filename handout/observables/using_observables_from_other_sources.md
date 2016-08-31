# Using Observables From Other Sources

In the example above we created `Observables` from scratch which is especially useful in understanding the anatomy of an `Observable`.

However, we will often create `Observables` from callbacks, promises, events, collections or using many of the operators available on the API.


## Observable HTTP Events

A common operation in any web application is getting or posting data to a server. Angular applications do this with the `Http` library, which previously used `Promises` to operate in an asynchronous manner. The updated `Http` library now incorporates `Observables` for triggering events and getting new data. Let's take a quick look at this:

```js
import {Component} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Component({
	selector: 'app',
	template: `
	  <b>Angular 2 HTTP requests using RxJs Observables!</b>
	  <ul>
	    <li *ngFor="let doctor of doctors">{{doctor.name}}</li>
	  </ul>
	  
	  `
})

export class MyApp {
  private doctors = [];
  
  constructor(http: Http) {
    http.get('http://jsonplaceholder.typicode.com/users/')
        .flatMap((data) => data.json())
        .subscribe((data) => {
          this.doctors.push(data);

        });
  }
}
```
[View Example](http://plnkr.co/edit/JbFNpn?p=preview)

This basic example outlines how the `Http` library's common routines like `get`, `post`, `put` and `delete` all return `Observables` that allow us to asynchronously process any resulting data. 


## Observable Form Events

Let's take a look at how `Observables` are used in Angular 2 forms. Each field in a form is treated as an `Observable` that we can subscribe to and listen for any changes made to the value of the input field. 

```js
import {Component} from '@angular/core';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
	selector: 'app',
	template: `
	  <form [formGroup]="coolForm">
			<input formControlName="email">
		</form>
	  <div>
			<b>You Typed Reversed:</b> {{data}}
		</div>
	`
})

export class MyApp {

	email: FormControl;
	coolForm: FormGroup;
	data: string;

	constructor(private fb: FormBuilder) {
		this.email = new FormControl();

		this.coolForm = fb.group({
			email: this.email
		});

		this.email.valueChanges
		.filter(n=>n)
		.map(n=>n.split('').reverse().join(''))
		.subscribe(value => this.data = value);
	}
}
```
[View Example](http://plnkr.co/edit/Dedd43?p=preview)


Here we have created a new form by initializing a new `FormControl` field and grouped it into a `FormGroup` tied to the `coolForm` HTML form. The `Control` field has a property `.valueChanges` that returns an `Observable` that we can subscribe to. Now whenever a user types something into the field we'll get it immediately.
