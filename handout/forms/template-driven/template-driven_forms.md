# Template-Driven Forms

The most straightforward approach to building forms in Angular 2 is to take advantage of the directives which have already been made for you.

First, consider a typical form:

```html
<form method="POST" action="/register" id="SignupForm">
  <label for="email">Email</label>
  <input type="text" name="email" id="email">

  <label for="password">Password</label>
  <input type="password" name="password" id="password">

  <button type="submit">Sign Up</button>
</form>
```

The simplest method for dealing with forms in Angular 2 is not much more complicated than this.
That's because Angular has already provided you a `form` directive (and friends), which operates under the covers.

For a basic implementation, we really just need to add a few attributes, and make sure our component knows what to do with the data.

_index.html_
```html
<signup-form>Loading...</signup-form>
```

_signup-form.component.html_
```html
<form #signupForm="ngForm" (ngSubmit)="registerUser(signupForm)">
  <label for="email">Email</label>
  <input type="text" name="email" id="email" ngModel>

  <label for="password">Password</label>
  <input type="password" name="password" id="password" ngModel>

  <button type="submit">Sign Up</button>
</form>
```

_signup-form.component.ts_
```ts
import {Component} from '@angular/core';

@Component({
  selector: 'signup-form',
  templateUrl: 'app/signup-form.component.html',
  providers: [NgForm]
})
export class SignupForm {
  registerUser (form: NgForm) {
    console.log(form.value);
    // {email: '...', password: '...'}
    // ...
  }
}
```
