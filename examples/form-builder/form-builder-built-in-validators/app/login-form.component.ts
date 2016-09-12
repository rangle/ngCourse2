import {Component} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'login-form',
  templateUrl: 'app/login-form.component.html'
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
    this.password = new FormControl('', [Validators.required]);
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