import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {FormBuilder} from 'angular2/common';
import {ControlGroup} from 'angular2/common';
import {Control} from 'angular2/common';
import {Validators} from 'angular2/common';
import {CustomValidators} from './custom-validators';

@Component({
  selector: 'my-form',
  templateUrl: 'app/my-form.component.html',
  directives: [FORM_DIRECTIVES]
})
export class MyForm {
  email: Control;
  password: Control;
  group: ControlGroup;
  
  emailValue: string;
  passwordValue: string;
  groupValue: string;
  
  constructor(builder: FormBuilder) {
    
    this.email = new Control('', 
      Validators.compose([Validators.required, CustomValidators.emailFormat]),
      CustomValidators.duplicated
    );
    
    this.password = new Control('',
      Validators.compose([Validators.required, Validators.minLength(4)])
    );
    
    this.group = builder.group({
      email: this.email,
      password: this.password
    });
    
    this.email.valueChanges.subscribe((value: string) => {
      this.emailValue = value;
    });
    this.password.valueChanges.subscribe((value: string) => {
      this.passwordValue =value;
    });
    this.group.valueChanges.subscribe((value: any) => {
      this.groupValue = value;
    });
  }
  
  onSubmit() {
    console.log(this.group.value);
  }
}