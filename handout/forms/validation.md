# Validation

In order to show validation messages for every field, we need to do a similar trick to the one we did for the form. We need to define a local template variable that is a reference to the directive itself.

The `ngControl` directive is a little tricky, first the directive definition is not called `NgControl` but [NgControlName](https://angular.io/docs/ts/latest/api/common/NgControlName-directive.html). Second, the directive itself is exported to the template with the same name as before: `ngForm`.

_app/my-form.component.html_
```html
<form ...>
  <div>
    <!-- ... -->
    <input type="email" id="email" ngControl="email" #email="ngForm" required >
  </div>
  
  <div>
    <!-- ... -->
    <input type="password" id="password" ngControl="password" #password="ngForm" required minlength="4">
  </div>
  <!-- ... -->
</form>
```

Here we have defined two local template variables and also we defined a couple of built-in validators like `required` and `minlength`. The only other built-in validator available for an input field is `maxlength` wich we are not going to use in this example.

> **Note:** When exporting a directive using for example `#email="ngForm"`, we are getting an instance of the directive `NgControlName`. To access the `Control` instance of the field, we need to get the property `control` like for example `email.control`.

With these two validators we can then show or hide error messages for each field.

_app/my-form.component.html_
```html
<form ...>

  <div>
    <!-- ... -->
    <ul *ngIf="email.dirty && !email.valid">
      <li *ngIf="email.errors.required">An email is required</li>
    </ul>
  </div>

  <div>
    <!-- ... -->
    <ul *ngIf="password.dirty && !password.valid">
      <li *ngIf="password.errors.required">A password is required</li>
      <li *ngIf="password.errors.minlength">A password needs to have at least 4 characters</li>
    </ul>
  </div>

  <button type="submit">Register</button>
</form>
```

We have at our disposal access to the validity of each field using the property `valid`, the state with `dirty`, `touched` and `pristine` and particular errors based on the validators applied inside the object `errors`. The description of the different states for a particular field are described in the table below.

State    | Meaning
-------- | -----------------------------------------------------------------
pristine | The field has just been rendered and hasn't been modified
dirty    | The field has been modified
touched  | The field has been modified and has lost focus
valid    | The field is passing all the validators

It's worth noting that `Control`, `ControlGroup` and `ControlArray` all inherit from [AbstractControl](https://angular.io/docs/ts/latest/api/common/AbstractControl-class.html) and because of this they share the same API to get values, errors and check the internal state (valid, dirty). For that reason, we can also check the validity of the form as a whole to disabled or enabled with the submit button.

_app/my-form.component.html_
```html
<form ...>
  <!-- ... -->
  <button type="submit" [disabled]="!regForm.valid">Register</button>
</form>
```

[View Example](https://plnkr.co/edit/w9KzDcfPpzDMHrcjjNEP?p=preview)

