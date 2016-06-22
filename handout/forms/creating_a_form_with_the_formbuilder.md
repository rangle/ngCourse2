# Creating a Form with the `FormBuilder`

The [FormBuilder](https://angular.io/docs/ts/latest/api/common/FormBuilder-class.html) is a class that allows us to create a form programatically. To use it in our component, we must inject it in the constructor.

_app/my-form.component.ts_
```javascript
// ...
import {FormBuilder} from '@angular/common';

// ...
export class MyForm
  constructor(builder: FormBuilder) {}
}
```

The `FormBuilder` class has a factory method called `group` that creates a `ControlGroup` instance that requires, as arguments, the `Control`s to define the fields of the form.

_app/my-form.component.ts_
```javascript
// ...
import {ControlGroup, Control} from '@angular/common';
// ...
export class MyForm {
  email: Control;
  password: Control;
  group: ControlGroup;

  constructor(builder: FormBuilder) {
    this.email = new Control();
    this.password = new Control();

    this.group = builder.group({
      email: this.email,
      password: this.password
    });
  }

  onSubmit() {
    console.log(this.group.value);
  }
}
```

We have created programmatically a new form using the `FormBuilder` with two fields: `email` and `password`.

Now we need to go back to our form template to change a few things. We are going to remove the validation temporarily because we have not defined the validators yet using this new approach.

_app/my-form.component.html_
```html
<form [ngFormModel]="group" (ngSubmit)="onSubmit()" novalidate>

  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" [ngFormControl]="email">
  </div>

  <div>
    <label for="password">Password:</label>
    <input type="password" id="password" [ngFormControl]="password">
  <div>

  <button type="submit">Register</button>
</form>
```

[View Example](http://plnkr.co/edit/9wCa32tXbYA1cDQEaA97?p=preview)

<iframe class="no-pdf" style="width: 100%; height: 300px" src="http://embed.plnkr.co/9wCa32tXbYA1cDQEaA97/" frameborder="0" allowfullscren="allowfullscren"></iframe>


There are five things to notice here:

* We changed the name we use to refer to our form from `regForm` to `group` because `regForm` used to be an instance of the `ngForm` directive while `group` is an instance of `ControlGroup`.

* We are binding our `ControlGroup` instance `group` created by the `FormBuilder` to the actual HTML form using the special property `[ngFormModel]`.

* We are binding our `Control` instances using the property `[ngFormControl]` to each of the form fields. We are using the `[ngFormControl]` property instead of the `ngControl` directive because the latter will try to create a new `Control` and not use the ones we have already created in our component.

* We don't need to export the form or the controls using the syntax `#group="ngForm"` or `#email="ngForm"` because we have already created those variables in our component and thus they are available in the template.

* We don't need to pass the form object to the `onSubmit` method because we have access to it inside our component in the variable `this.group`.
