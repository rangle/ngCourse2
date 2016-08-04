# Template Model Binding

### One-Way Binding
If you need a form with default values, you can start using the value-binding syntax for ngModel.

_app/signup-form.component.html_
```html
<form #signupForm="ngForm" (ngSubmit)=register(signupForm)>

  <label for="username">Username</label>
  <input type="text" name="username" id="username" [ngModel]="generatedUser">

  <label for="email">Email</label>
  <input type="email" name="email" id="email" ngModel>

  <button type="submit">Sign Up</button>
</form>
```

_app/signup-form.component.ts_
```ts
import {Component} from '@angular/core';
// ...

@Component({ /* ... */ })
export class SignupForm {
  generatedUser: string = generateUniqueUserID();

  register(form: NgForm) {
    console.log(form.value);
    // ...
  }
}
```

### Two-Way Binding

While Angular 2 assumes one-way binding by default, two-way binding is still available if you need it.

In order to have access to two-way binding in template-driven forms, use the “Banana-Box” syntax (`[(ngModel)]="propertyName"`).

Be sure to declare all of the properties you will need on the component.

```html
<form #signupForm="ngForm" (ngSubmit)=register(signupForm)>

  <label for="username">Username</label>
  <input type="text" name="username" id="username" [(ngModel)]="username">

  <label for="email">Email</label>
  <input type="email" name="email" id="email" [(ngModel)]="email">

  <button type="submit">Sign Up</button>
</form>
```

```ts
import {Component} from '@angular/core';
// ...

@Component({ /* ... */ })
export class SignUpForm {
  username: string = generateUniqueUserID();
  email: string = '';

  register(form: NgForm) {
    console.log(form.value.username);
    console.log(this.username);
    // ...
  }
}
```
