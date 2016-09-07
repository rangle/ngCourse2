import {Component} from '@angular/core';
import {
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';

function hasExclamationMark (input: FormControl) {
  const hasExclamation = input.value.indexOf('!') >= 0;

  return hasExclamation ? null : { needsExclamation: true };
}

@Component({
  selector: 'login-form',
  templateUrl: 'app/login-form.component.html',
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class LoginForm {
  loginForm: FormGroup;
  username: FormControl;
  password: FormControl;

  constructor (builder: FormBuilder) {
    this.username = new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]);
    this.password = new FormControl('', [Validators.required, hasExclamationMark]);
    this.loginForm = builder.group({
      username: this.username,
      password: this.password
    });
  }
  login () {
    console.log(this.loginForm.value);
    // Attempt Logging in...
  }
}