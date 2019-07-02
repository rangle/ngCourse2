# Using Template Model Binding

## One-Way Binding

If you need a form with default values, you can start using the value-binding syntax for ngModel.

_app/signup-form.component.html_

```markup
<form #signupForm="ngForm" (ngSubmit)="register(signupForm)">
  <label for="username">Username</label>
  <input type="text" name="username" id="username" [ngModel]="generatedUser">

  <label for="email">Email</label>
  <input type="email" name="email" id="email" ngModel>

  <button type="submit">Sign Up</button>
</form>
```

_app/signup-form.component.ts_

```typescript
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
// ...

@Component({
  // ...
})
export class SignupFormComponent {
  generatedUser: string = generateUniqueUserID();

  register(form: NgForm) {
    console.log(form.value);
    // ...
  }
}
```

## Two-Way Binding

While Angular assumes one-way binding by default, two-way binding is still available if you need it.

In order to have access to two-way binding in template-driven forms, use the “Banana-Box” syntax \(`[(ngModel)]="propertyName"`\).

Be sure to declare all of the properties you will need on the component.

```markup
<form #signupForm="ngForm" (ngSubmit)="register(signupForm)">
  <label for="username">Username</label>
  <input type="text" name="username" id="username" [(ngModel)]="username">

  <label for="email">Email</label>
  <input type="email" name="email" id="email" [(ngModel)]="email">

  <button type="submit">Sign Up</button>
</form>
```

```typescript
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  // ...
})
export class SignUpFormComponent {
  username: string = generateUniqueUserID();
  email = '';

  register(form: NgForm) {
    console.log(form.value.username);
    console.log(this.username);
    // ...
  }
}
```

