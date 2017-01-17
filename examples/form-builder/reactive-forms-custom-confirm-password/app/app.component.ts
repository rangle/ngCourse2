import { Component } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';

function hasPunctuation(punctuation: string, errorType: string) {
  return function(input: FormControl) {
    return input.value.indexOf(punctuation) >= 0 ?
        null :
        { [errorType]: true };
  };
}

function duplicatePassword(input: FormControl) {

  if (!input.root.controls) {
    return null;
  }

  const exactMatch = input.root.controls.password.value === input.value;
  return exactMatch ? null : { mismatchedPassword: true };
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
    hasPunctuation('&', 'ampersandRequired')
  ]);
  
  duplicatePassword = new FormControl('', [
    Validators.required,
    duplicatePassword
  ]);

  loginForm: FormGroup = this.builder.group({
    username: this.username,
    password: this.password,
    duplicatePassword: this.duplicatePassword,
  });

  constructor(private builder: FormBuilder) { }

  login () {
    console.log(this.loginForm.value);
    // Attempt Logging in...
  }
}