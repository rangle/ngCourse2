import {Component} from '@angular/core';
import {FORM_DIRECTIVES, NgForm, FormBuilder, Control, ControlGroup, Validators} from '@angular/common';
import {CustomValidators} from './custom-validators';

@Component({
  selector: 'my-form',
  templateUrl: 'app/my-form.component.html',
  directives: [FORM_DIRECTIVES],
  styleUrls: ['styles.css']
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