# Models

So far the form only gets information from the user. What if there's a need to edit an existing model? The property `[ngModel]` exists just for that.

First, a model needs to be defined as a new class.

_app/user.model.ts_
```javascript
export class User {
  constructor(
    public email: string,
    public password: string) {}
}
```

In order to use it in the `MyForm` component, an instance of the `User` class needs to be defined.

_app/my-form.component.ts_
```javascript
// ...
import {User} from './user.model';

// ...
export class MyForm {
  user: User;
  // ...
  constructor() {
    this.user = new User('joe.satriani@gmail.com', 'secretpass');
    // ...
  }
  // ...
}
```

With this instance, the property `[ngModel]` can be used in the template to bind the value of the field to the model.

_app/my-form.component.html_
```html
<form ...>
  <div>
      <!-- ... -->
      <input type="email" id="email" [ngFormControl]="email" [ngModel]="user.email">
      <!-- ... -->
  </div>
  <div>
      <!-- ... -->
      <input type="password" id="password" [ngFormControl]="password" [ngModel]="user.password">
      <!-- ... -->
  </div>
  <p>{{ user | json }}</p>
  <!-- ... -->
</form>
```

Notice that when changing the values of the forms, the debug information shown at the bottom of the form is not being updated accordingly. That's because the property binding `[ngModel]` implements one way data binding. To close the circle, the component can be modified as well to update the model on submit.

_app/my-form.component.ts_
```javascript
// ...
export class MyForm {
  // ...
  onSubmit() {
    this.user.email = this.group.value.email;
    this.user.password = this.group.value.password;
    console.log('data sent to server', this.user);
  }
}
```

[View Example](https://plnkr.co/edit/MvyM90Ankx46byFWJylh?p=preview)

<iframe style="width: 100%; height: 300px" src="https://embed.plnkr.co/MvyM90Ankx46byFWJylh/" frameborder="0" allowfullscren="allowfullscren"></iframe>

Using this approach the usual Angular 1, 2-way data binding approach is avoided.

If 2-way data binding is still needed, the property syntax can be combined with the event syntax.

_app/my-form.component.html_
```html
<form ...>
  <div>
    <!-- ... -->
    <input type="email" id="email" [ngFormControl]="email" [(ngModel)]="user.email">
    <!-- ... -->
  </div>
  <div>
    <!-- ... -->
    <input type="password" id="password" [ngFormControl]="password" [(ngModel)]="user.password">
    <!-- ... -->
  </div>
  <!-- ... -->
</form>
```

[View Example](https://plnkr.co/edit/FVPapDQnIbv2Ex6fn4js?p=preview)

<iframe style="width: 100%; height: 300px" src="https://embed.plnkr.co/FVPapDQnIbv2Ex6fn4js/" frameborder="0" allowfullscren="allowfullscren"></iframe>

Now, the model is being updated any time the form is being changed.

## Alternative Syntax

When dealing with a very long form, creating a variable for every field in the form can be tedious. Angular 2 provides an alternative syntax to creating a form using the `FormBuilder`.

_app/my-form.component.ts_
```javascript
// ...
export class MyForm {
  group: ControlGroup;
  user: User

  constructor(builder: FormBuilder) {
    this.user = new User('joe.satriani@gmail.com', 'secretpass');

    this.group = builder.group({
      email: ['',
        Validators.compose([Validators.required, CustomValidators.emailFormat]),
        CustomValidators.duplicated
      ],
      password: ['',
        Validators.compose([Validators.required, Validators.minLength(4)])
      ]
    });

    this.group.find('email').valueChanges.subscribe((value: string) => {
      console.log('email', value);
    });
    this.group.find('password').valueChanges.subscribe((value: string) => {
      console.log('password', value);
    });
    this.group.valueChanges.subscribe((value: any) => {
      console.log('form', value);
    });
  }
  //...
}
```

Instead of assigning our controls to every key in the group method, we now pass an array where every element is a map of the arguments present in the `Control` constructor.

Because now we don't have access to every control in our template, we need to resort in the form itself to do the validation for each field.

_app/my-form.component.html_
```html
<form ...>
  <div>
    <!-- ... -->
    <input type="email" id="email" [ngFormControl]="group.find('email')" [(ngModel)]="user.email">
    <span *ngIf="group.find('email').pending">Checking duplication...</span>

    <ul *ngIf="group.find('email').dirty && !group.find('email').valid">
      <li *ngIf="group.hasError('required', 'email')">This field is required</li>
      <li *ngIf="group.hasError('emailFormat', 'email')">This field needs to have at least 3 characters</li>
      <li *ngIf="group.hasError('duplicated', 'email')">This value cannot be used</li>
    </ul>
  </div>

  <div>
    <!-- ... -->
    <input type="password" id="password" [ngFormControl]="group.find('password')" [(ngModel)]="user.password">

    <ul *ngIf="group.find('password').dirty && !group.find('password').valid">
      <li *ngIf="group.hasError('required', 'password')">This field is required</li>
      <li *ngIf="group.hasError('minlength', 'password')">This field doesn't allow numbers</li>
    </ul>
  </div>
  <!-- ... -->
</form>
```

[View Example](https://plnkr.co/edit/FVPapDQnIbv2Ex6fn4js?p=preview)

<iframe style="width: 100%; height: 300px" src="https://embed.plnkr.co/FVPapDQnIbv2Ex6fn4js/" frameborder="0" allowfullscren="allowfullscren"></iframe>

We are using two methods of our form component, `find` and `hasError`.

Let's get the instance of the `Control` we are using from the form and in this way, we can do the same validations of state and errors as before.

> **Note:** You may find in some docs the use of a `control` object instead of the method `find` like this: `group.controls['firstName']`. We are avoiding this approach because it will only work when we are dealing with a `ControlGroup` where every control is stored in an object. If we were working with a `ControlArray` this approach will not work because there's not a key to refer to each control. The method `find` is an abstraction that will take care of both situations and will get us the proper control back.
