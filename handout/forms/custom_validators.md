# Custom Validators

Having three validators is just not enough - let's create a custom validator to check that our email field has the proper format.

_app/custom-validators.ts_
```javascript
import {Control} from '@angular/common';

export class CustomValidators {
  static emailFormat(control: Control): [[key: string]: boolean] {
    let pattern:RegExp = /\S+@\S+\.\S+/;
    return pattern.test(control.value) ? null : {"emailFormat": true};
  }
}
```

A validator is just a class with a number of static methods. Each method receives a `Control` instance and returns an object in case the validation fails or `null` in case the validation passes.

We can now add the validator in our component logic and add a new item in our HTML to show this error.

_app/validators.ts_
```javascript
// ...
import {CustomValidators} from './custom-validators';

// ...
export class MyForm {
  // ...
  constructor(builder: FormBuilder) {
    // ...
    this.email = new Control('',
      Validators.compose([Validators.required, CustomValidators.emailFormat])
    );
    // ...
  }
  // ...
}
```

In the template, we need to look for the same key that is returned by the validator in case of an error - in this case, the key `emailFormat`.

_app/my-form.component.html_
```html
<form ...>
  <div>
    <!-- ... -->
    <ul *ngIf="email.dirty && !email.valid">
      <li *ngIf="email.hasError('required')">An email is required</li>
      <li *ngIf="email.hasError('emailFormat')">The value introduced is not an email</li>
    </ul>
  </div>
  <!-- ... -->
</form>
```

[View Example](http://plnkr.co/edit/qjAx0cJMI1meveR7dyHF?p=preview)

<iframe class="no-pdf" style="width: 100%; height: 300px" src="http://embed.plnkr.co/qjAx0cJMI1meveR7dyHF/" frameborder="0" allowfullscren="allowfullscren"></iframe>
