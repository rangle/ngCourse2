import {Component} from 'angular2/core';
import {Control, ControlGroup, FormBuilder} from 'angular2/common';


@Component({
	selector: 'app-root',
	template: `
	  <form [ngFormModel]="coolForm"><input ngControl="email"></form>
	  <div><b>You Typed:</b> {{data}}</div>
	`
})

export class AppComponent {

	email:Control;
	coolForm:ControlGroup;
	data:string;

	constructor(private fb: FormBuilder) {
		this.email = new Control();

		this.coolForm = fb.group({
			email: this.email
		});

		this.email.valueChanges.subscribe(value => this.data = value);
	}
}