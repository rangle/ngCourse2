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
  
  constructor(builder: FormBuilder) {
    
    this.email = new Control('', 
      Validators.compose([Validators.required, CustomValidators.emailFormat])
    );
    
    this.password = new Control('',
      Validators.compose([Validators.required, Validators.minLength(4)])
    );
    
    this.group = builder.group({
      email: this.email,
      password: this.password
    });
  }
  
  onSubmit() {
    console.log(this.group.value);
  }
}