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

		this.email.valueChanges.subscribe(value => this.data = value);
	}
}