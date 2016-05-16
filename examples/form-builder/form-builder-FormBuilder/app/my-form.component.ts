import {Component} from '@angular/core';
import {FORM_DIRECTIVES, NgForm, FormBuilder, Control, ControlGroup} from '@angular/common';

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