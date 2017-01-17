import { Component } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';


function hasExclamationMark (input: FormControl) {
  const hasExclamation = input.value.indexOf('!') >= 0;

  return hasExclamation ? null : { needsExclamation: true };
}

@Component({
  selector: 'app-root',
  templateUrl: 'app/app.component.html'
})
export class AppComponent {
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);
  
  password = new FormControl('', [
    Validators.required,
    hasExclamationMark
  ]);

  loginForm: FormGroup = this.builder.group({
    username: this.username,
    password: this.password
  });

  constructor(private builder: FormBuilder) { }

  login () {
    console.log(this.loginForm.value);
    // Attempt Logging in...
  }
}