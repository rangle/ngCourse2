# Template-Driven Forms

The most straightforward approach to building forms in Angular is to take advantage of the directives provided for you.

First, consider a typical form:

```markup
<form method="POST" action="/register" id="signup-form">
  <label for="email">Email</label>
  <input type="text" name="email" id="email">

  <label for="password">Password</label>
  <input type="password" name="password" id="password">

  <button type="submit">Sign Up</button>
</form>
```

Angular has already provided you a `form` directive, and form related directives such as input, etc which operates under the covers. For a basic implementation, we just have to add a few attributes and make sure our component knows what to do with the data.

_index.html_

```markup
<signup-form>Loading...</signup-form>
```

_signup-form.component.html_

```markup
<form #signupForm="ngForm" (ngSubmit)="registerUser(signupForm)">
  <label for="email">Email</label>
  <input type="text" name="email" id="email" ngModel>

  <label for="password">Password</label>
  <input type="password" name="password" id="password" ngModel>

  <button type="submit">Sign Up</button>
</form>
```

_signup-form.component.ts_

```typescript
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  templateUrl: 'app/signup-form.component.html',
})
export class SignupFormComponent {
  registerUser(form: NgForm) {
    console.log(form.value);
    // {email: '...', password: '...'}
    // ...
  }
}
```

