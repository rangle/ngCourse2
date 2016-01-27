# Async Validators

Until this point, our validation logic is living in the frontend, but what happens if we want to check for some logic that only exists in the server? For example, let's say we want to prevent two users trying to register using the same email. To do that, we need to verify that the email entered does not exist in our database and we want to alert the user as he/she types. That's when the async validator comes in handy.

Our new async validator is going to live inside the `CustomValidators` class and the return value of the static method is going to be exactly the same as the method `emailFormat` so before writing our now validation rule, let's do a simple refactoring to clean the code a little bit. 

_app/validators.ts_
```javascript
// ...

interface IValidation {
  [key: string]: boolean;
}

export class CustomValidators {
  static emailFormat(control: Control): IValidation {
    let pattern:RegExp = /\S+@\S+\.\S+/;
    return pattern.test(control.value) ? null : {"emailFormat": true}; 
  }
}
```

We have created an interface to define the return value of our methods so we can use the same interface with our new validator.

An async validator must return a promise that should resolve to an object with the error when our server responds with a failed validation, or should resolve to `null` when the server responds with a successful validation.

_app/validators.ts_
```javascript
// ...

export class CustomValidators {
  // ...
  static duplicated(control: Control) {
    const q = new Promise<IValidation>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'john.doe@gmail.com') {
          resolve({'duplicated': true});
        } else {
          resolve(null);
        }
      }, 1000);
    });
    return q;
  }
}
```

We named our new validator `duplicated` and we used the `setTimeout` function to mock a call to the server that could take 1 second to complete.

The next step is to add the new validation method as the third argument of the `Control` constructor.

_app/my-form.component.ts_
```javascript
// ...
export class MyForm {
  // ...
  constructor(builder: FormBuilder) {
    this.email = new Control('',
      Validators.compose([Validators.required, CustomValidators.emailFormat]), CustomValidators.duplicated
    );
    // ...
  }
  // ...
}
```

We can modify again our template to accommodate the new error message.

_app/my-form.component.html_
```html
<form ...>
  <div>
    <label for="email">Email:</label>
    <input type="text" id="email" [ngFormControl]="email">
    <span *ngIf="email.pending">Checking duplication...</span>
    <ul ...>
      <!-- ... -->
      <li *ngIf="email.hasError('duplicated')">This email has been registered already</li>
    </ul>
  </div>
  <!-- ... -->
</form>
```

[View Example](https://plnkr.co/edit/0OUp4WcCPJ56nneAPYoK?p=preview)

Notice that not only do we have a new error key but our field has a new state called `pending` that is `true` when angular waits for the promise to be resolved and `false` otherwise. That way we can give feedback to the user that some validation is being performed in the background that could take a while to finish.

## Observing Changes

The `ControlGroup` and `Control` components both behave as observables, meaning that we can subscribe to their streams in order to "watch" changes in the form values.

_app/my-form.component.ts_
```javascript
// ...
export class MyForm {
  // ...
  constructor(builder: FormBuilder) {
    // ...
    this.email.valueChanges.subscribe((value: string) => {
      console.log('email', value);
    });
    this.password.valueChanges.subscribe((value: string) => {
      console.log('password', value);
    });
    this.group.valueChanges.subscribe((value: any) => {
      console.log('form', value);
    });
  }
  // ...
}
```

[View Example](https://plnkr.co/edit/h5c6NQwpLdF2KOjlNtVc?p=preview)

While the subscriber for the fields receives the values as strings, the form subscriber receives its value as an object representing the entire information introduced in the form. Every time the user changes the value of any of the fields, the corresponding field subscriber is invoked as well as the form subscriber.

