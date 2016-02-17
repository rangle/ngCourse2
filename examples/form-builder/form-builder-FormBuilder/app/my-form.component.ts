import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {FormBuilder} from 'angular2/common';
import {ControlGroup} from 'angular2/common';
import {Control} from 'angular2/common';

@Component({
  selector: 'my-form',
  templateUrl: 'app/my-form.component.html',
  directives: [FORM_DIRECTIVES]
})
export class MyForm {
  email: Control;
  password: Control;
  group: ControlGroup;
  formValue: any;
  
  constructor(builder: FormBuilder) {
    this.email = new Control();
    this.password = new Control();
    
    this.group = builder.group({
      email: this.email,
      password: this.password
    });
  }
  
  onSubmit() {
    this.formValue = this.group.value;
  }
}