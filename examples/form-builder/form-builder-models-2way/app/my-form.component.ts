import {Component} from '@angular/core';
import {FORM_DIRECTIVES, NgForm, FormBuilder, Control, ControlGroup, Validators} from '@angular/common';
import {CustomValidators} from './custom-validators';
import {User} from './user.model.ts';


@Component({
  selector: 'my-form',
  templateUrl: 'app/my-form.component.html',
  directives: [FORM_DIRECTIVES]
})
export class MyForm {
  email: Control;
  user: User;
  
  constructor(builder: FormBuilder) {
    this.user = new User('joe.satriani@gmail.com', 'secretpass');
    
    this.group = builder.group({
      email: ['', 
        Validators.compose([Validators.required, CustomValidators.emailFormat]),
        CustomValidators.duplicated
      ],
      password: ['', 
        Validators.compose([Validators.required, Validators.minLength(4)])
      ]
    });
    
    this.group.find('email').valueChanges.subscribe((value: string) => {
      console.log('email', value);
    });
    this.group.find('password').valueChanges.subscribe((value: string) => {
      console.log('password', value);
    });
    this.group.valueChanges.subscribe((value: any) => {
      console.log('form', value);
    });
  }
  
  onSubmit() {
    console.log('data sent to server', this.user);
  }
}