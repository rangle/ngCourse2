# FormBuilder Validation

Building from the previous login form, we can also rather quickly and easily add validation.

Angular 2 provides a lot of validators, out of the box.
They can be imported along with the rest of the rest of the dependencies for procedural forms.

_app/login-form.component.ts_
```ts
import {
  // ...
  Validators
} from '@angular/forms';

@Component({ /* ... */ })
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
```

_app/login-form.component.html_
```html
<form [formGroup]="loginForm" (ngSubmit)="login()">
  Inside the form.
  <div>
    <label for="username">username</label>
    <input type="text" name="username" id="username" [formControl]="username">
    <div [hidden]="username.valid || username.untouched">
      <div>The following problems have been found with the username:</div>
      <div [hidden]="!username.hasError('minLength')">Username can not be shorter than 5 characters.</div>
      <div [hidden]="!username.hasError('required')">Username is required.</div>
    </div>
  </div>
  <div >
    <label for="password">password</label>
    <input type="password" name="password" id="password" [formControl]="password">
    <div [hidden]="password.valid || password.untouched">
      <div>The following problems have been found with the password:</div>
      <div [hidden]="!password.hasError('required')">The password is required.</div>
    </div>
  </div>
  <button type="submit" [disabled]="!loginForm.valid">Log In</button>
</form>
```

Note that we have added rather robust validation on both the fields, and the form itself, using nothing more than built-in validators and some template logic.

[View Example](https://plnkr.co/edit/NGejGL?p=preview)

We are using `.valid` and `.untouched` to determine whether or not we need to show errors. The field may be required, but if it hasn't been visited yet, we have not reason to tell the user that the value is wrong.

For built-in validation, we are calling `.hasError()` on the form element, and we are passing a string which represents the validator function we included. If this test returns true, then we display the error message, which is otherwise hidden.
