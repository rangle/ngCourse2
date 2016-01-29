# Built-in Validators

In contrast with our first approach, we are not going to be using the HTML properties `required` and `minlength`, instead we are going to pass these validators to the Control constructor of both fields.

_app/my-form.component.ts_
```javascript
// ...
import {Validators} from 'angular2/common';

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

The first (optional) value of the `Control` constructor is the default value for the field, in this case we are leaving it empty. The second argument is the validators that should apply to the field.

The `Validator` class gives us access to the three built-in validators `require`, `minLength` and `maxLength`. If more than one validator is needed for a field, we need to combine them using the method `compose` as shown in the example before.

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

[View Example](https://plnkr.co/edit/TRjR4wGc3lopwoUdo5Hf?p=preview)

<iframe style="width: 100%; height: 300px" src="https://embed.plnkr.co/TRjR4wGc3lopwoUdo5Hf" frameborder="0" allowfullscren="allowfullscren"></iframe>

Notice that this time the method `hasError` is being used insted of accessing the `errors` object directly as before. When the field is valid, the `errors` object is `null` so trying to access `email.errors.required` will generate an internal error. We avoid that problem by wrapping our error logic inside an `*ngIf="!email.valid"` so we assure that the errors object exists before trying to render each specific error. This might not always be the case, so it's better to use the `hasError` method to check for a validation error.

