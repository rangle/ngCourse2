import {Component} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';
import {FormBuilder} from '@angular/common';
import {ControlGroup} from '@angular/common';
import {Control} from '@angular/common';
import {Validators} from '@angular/common';
import {CustomValidators} from './custom-validators';
import {User} from './user.model.ts';

@Component({
  selector: 'my-form',
  templateUrl: 'app/my-form.component.html',
  directives: [FORM_DIRECTIVES]
})
export class MyForm {
  email: Control;
  password: Control;
  group: ControlGroup;
  user: User;
  
  constructor(builder: FormBuilder) {
    
    this.user = new User('joe.satriani@gmail.com', 'secretpass');
    
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
      console.log('email', value);
    });
    this.password.valueChanges.subscribe((value: string) => {
      console.log('password', value);
    });
    this.group.valueChanges.subscribe((value: any) => {
      console.log('form', value);
    });
  }
  
  onSubmit() {
    this.user.email = this.group.value.email;
    this.user.password = this.group.value.password;
    console.log('data sent to server', this.user);
  }
}