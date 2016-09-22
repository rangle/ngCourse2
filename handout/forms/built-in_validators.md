# Built-in Validators

In contrast with our first approach, we are not going to use the HTML properties `required` and `minlength`. Instead we will pass these validators to the Control constructor of both fields.

_app/my-form.component.ts_
```javascript
// ...
import {Validators} from '@angular/common';

// ...
export class MyForm {
  // ...
  constructor(builder: FormBuilder) {

    this.email = new Control('', Validators.required);

    this.password = new Control('',
      Validators.compose([Validators.required, Validators.minLength(4)])
    );
    // ...
  }
  // ...
}
```

The first (optional) value of the `Control` constructor is the default value for the field - we are leaving it empty. The second argument is the validators that should apply to the field.

The `Validator` class gives us access to the three built-in validators, `require`, `minLength` and `maxLength`. If more than one validator is needed for a field, we must combine them using the `compose` method as shown in the previous example.

Now that our validators are in place, we can again add the template to show the error messages.

_app/my-form.component.html_
```html
<form ...>

  <div>
    <!-- ... -->
    <ul *ngIf="email.dirty && !email.valid">
      <li *ngIf="email.hasError('required')">An email is required</li>
    </ul>
  </div>

  <div>
    <!-- ... -->
    <ul *ngIf="password.dirty && !password.valid">
      <li *ngIf="password.hasError('required')">A password is required</li>
      <li *ngIf="password.hasError('minlength')">A password needs to have at least 4 characters</li>
    </ul>
  </div>

  <!-- ... -->
</form>
```

[View Example](http://plnkr.co/edit/AVx1TH0MarhMmBYARGJp?p=preview)

Notice that this time the method `hasError` is being used instead of accessing the `errors` object directly as before. When the field is valid, the `errors` object is `null`, so trying to access `email.errors.required` will generate an internal error. We avoid that problem by wrapping our error logic inside an `*ngIf="!email.valid"` so we assure that the errors object exists before trying to render each specific error. This might not always be the case, so it's better to use the `hasError` method to check for a validation error.
