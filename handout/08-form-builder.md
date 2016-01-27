<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Part 8: Forms](#part-8-forms)
  - [Creating a Form with Directives](#creating-a-form-with-directives)
  - [Getting the Form's Values](#getting-the-forms-values)
  - [Control Grouping](#control-grouping)
  - [Validation](#validation)
  - [Visual Cues with CSS](#visual-cues-with-css)
  - [Creating a Form with the "FormBuilder"](#creating-a-form-with-the-formbuilder)
  - [Built-in Validators](#built-in-validators)
  - [Custom Validators](#custom-validators)
  - [Async Validators](#async-validators)
  - [Observing Changes](#observing-changes)
  - [Models](#models)
  - [Alternative Syntax](#alternative-syntax)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Part 8: Forms

Capturing data from the user is the cornerstone of any application and it's usually done through forms. Angular 2 is much more flexible than Angular 1 for handling forms, we are no longer restricted to just the `ngModel`. In Angular 2, there are two ways to define forms: using directives in our templates or using the `FormBuilder`.

Using directives gives us the power of rapid prototyping without too much boilerplate, but we are somehow restricted of what we can do. The `FormBuilder` on the other hand, lets us define our form through code and gives us much more flexibility and control over data validation.

Which approach to use will depend on the developer's needs, but we are going to start with the simplest one: directives.

## Creating a Form with Directives

Let's create a very simple component that just renders a form. In our main _index.html_ file we are going to define a new html element called `<my-form>`.

_index.html_
```html
<my-form>Loading...</my-form>
```

Then we are going to create a boot file to load the main component of our application.

_app/boot.ts_
```javascript
import {bootstrap} from 'angular2/platform/browser';
import {MyForm} from './my-form.component';

bootstrap(MyForm);
```

In order to render the `<my-form>` element, we need to define a new component.

_app/my-form.component.ts_
```javascript
import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

@Component({
  selector: 'my-form',
  templateUrl: 'app/my-form.component.html'
})
export class MyForm {}
```

And finally, we'll define the component's template as a separate file for easier visualization.

_app/my-form.component.html_
```html
<form novalidate>

  <div>
    <label for="email">Email:</label>
    <input type="email" id="email">
  </div>

  <div>
    <label for="password">Password:</label>
    <input type="password" id="password">
  </div>

  <button type="submit">Register</button>

</form>
```

> We are using the attribute `novalidate` in our form to prevent the browser from performing its built-in validation for the email field. We are going to create our own validation using Angular in a following section.

[View Example](https://plnkr.co/edit/DzBxhlzGLb3fg3rtPGnx?p=preview)

At this point, if we click the submit button nothing happens because we defined a standard HTML form, not an Angular 2 form. To fix that, we need to tell our component to upgrade our form using the `NgForm` directive wich will give us access to new properties and event bindings on our form to interact with it.

_app/my-form.component.ts_
```javascript
// ...
import {FORM_DIRECTIVES} from 'angular2/common';

@Component({
  // ...
  directives: [FORM_DIRECTIVES]
})
export class MyForm {}
```

Notice that we didn't include the `NgForm` directly, instead we included [FORM_DIRECTIVES](https://angular.io/docs/ts/latest/api/common/FORM_DIRECTIVES-let.html) which is an array of all the directives used in forms, including `NgForm`. To see all the directives included in this array, check the [source code](https://github.com/angular/angular/blob/2.0.0-beta.0/modules/angular2/src/common/forms/directives.ts#L52-L71).

Because we now have an Angular 2 form, we can listen to the `ngSubmit` event which is triggered whenever the form is submitted.

_app/my-form.component.html_
```html
<form (ngSubmit)="onSubmit()">
```

We are telling our component that when the form is submitted, the `onSubmit` method of our component will be invoked, so let's define this method.

_app/my-form.component.ts_
```javascript
@Component({
  // ...
})
export class MyForm {
  onSubmit() {
    console.log('Form submitted!');
  }
}
```

[View Example](https://plnkr.co/edit/ezQ0bfUkswxQReb9gmVa?p=preview)

Now when we click the submit button, we can see in the console the message "Form submitted!".

## Getting the Form's Values

Right now, our component doesn't know how to get the values introduced in the form's fields. To do that, we need a way to pass an instance of the form when calling the `onSubmit` method on the template.

The `NgForm` directive, besides defining a new `ngSubmit` event on the form, is also creating and **exporting** an instance of the `NgForm` directive, called unsurprisingly `ngForm`, to be used as a local template variable.

_app/my-form.component.html_
```html
<form #regForm="ngForm" (ngSubmit)="onSubmit(regForm)" novalidate>
```

Here we are naming `regForm` (short for "registration form") our local reference to the `NgForm` directive instance and passing it to our component in the `onSubmit` method. It's now time to update the component method to read the values of our form.

_app/my-form.component.ts_
```javascript
// ...
import {NgForm} from 'angular2/common';

@Component({
  // ...
})
export class MyForm {
  onSubmit(regForm: NgForm) {
    console.log(regForm.value);
  }
}
```

[View Example]()

Even if we fill both inputs and click the submit button, we get an empty object in the console. To understand what's happening we need to stop for a moment to review some core concepts about forms in Angular 2 before moving on with our code example.

## Control Grouping

In Angular 2, there are three basic built-in classes that help us manage forms:

- `Control`
- `ControlGroup`
- `ControlArray`

A [Control](https://angular.io/docs/ts/latest/api/common/Control-class.html) is the most basic unit of a form and it's associated with individual fields of a form. Through a `Control` we can know the field's value, its state (whether or not is valid or has been changed), and its errors.

A [ControlGroup](https://angular.io/docs/ts/latest/api/common/ControlGroup-class.html) is a collection of `Control`s of fixed length. A `ControlGroup` is useful to define the validity of the group of controls as a whole, without the need to iterate through all of them manually to check if all are valid or not.

**When we define a form using the `NgForm` directive, automatically every form element creates an internal `ControlGroup` to hold all the `Control`s inside of it.**

A [ControlArray](https://angular.io/docs/ts/latest/api/common/ControlArray-class.html) is exactly the same as a `ControlGroup` but with a variable length.

In the previous example, the exported template variable that we are getting from:

```html
<form #regForm="ngForm" ...>
```

is in fact an instance of the `NgForm` directive, not directly an instance of the `ControlGroup` class. To get to the `ControlGroup` instance created internally by the `NgForm` directive, we need to access the property `regForm.form`.

Let's go back to our code. We now know that our form element has been *upgraded* with the `NgForm` directive, and because of that, it has created an internal `ControlGroup` for us to hold a reference to its child controls. The problem is that at this point Angular doesn't recognize the nested fields as controls belonging to the form. To make this association explicit, we need to use the directive `ngControl` on our form fields.

_app/my-form.component.html_
```html
<form ...>
  
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" ngControl="email">
  </div>
  
  <div>
    <label for="password">Password:</label>
    <input type="password" id="password" ngControl="password">
  </div>
  
  <!-- ... -->
</form>
```

[View Example](https://plnkr.co/edit/krj8g1HBU7zqOvnesf4Q?p=preview)

When we add the directive `ngControl` to the fields, Angular automatically registers these controls as part of the `ControlGroup` of the parent form.

Now, if we put the values "joe.satriani@gmail.com" as email and "secretpass" as password and click the register button, we get the correct values on the console.

```javascript
Object {email: "joe.satriani@gmail.com", password: "secretpass"}
```

## Validation

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

## Visual Cues with CSS

Angular 2 also offers a way to define special CSS styles adding or removing classes to the form fields dependent on its state and validation following the rules shown in the table below.

Class        | States
------------ | ---------------------------------------
ng-pristine  | `pristine == true` and `dirty == false`
ng-dirty     | `dirty == true` and `pristine == false`
ng-touched   | `touched == true`
ng-untouched | `touched == false`
ng-valid     | `valid == true`
ng-invalid   | `valid == false`

If we want to define a style for an invalid input field, we could define a CSS rule for that.

_styles.css_
```css
.ng-invalid.ng-dirty {
  border-left: 5px solid red;
}
```

We need now to update our _index.html_ file to reference our new stylesheet.

_index.html_
```html
<html>
  <head>
    <!-- ... -->
    <link rel="stylesheet" href="styles.css">
  </head>
  <!-- ... -->
</html>
```

[View Example](https://plnkr.co/edit/g99Nrw1tQtX6MFFViPHs?p=preview)

So far all of our validation logic lives in the template and we are doing very basic validation. What if we want to use some custom validation? We need to have more control of our form and for that, we need to use the `FormBuilder`.

## Creating a Form with the "FormBuilder"

The [FormBuilder](https://angular.io/docs/ts/latest/api/common/FormBuilder-class.html) is a class that allows us to create a form programatically. To use it in our component, we need to inject it in the constructor.

_app/my-form.component.ts_
```javascript
// ...
import {FormBuilder} from 'angular2/common';

// ...
export class MyForm
  constructor(builder: FormBuilder) {}
}
```

The `FormBuilder` class has a factory method called `group` that creates a `ControlGroup` instance that requires, as arguments, the `Control`s to define the fields of the form.

_app/my-form.component.ts_
```javascript
// ...
import {ControlGroup} from 'angular2/common';
import {Control} from 'angular2/common';

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

We have created programatically a new form using the `FormBuilder` with two fields: `email` and `password`.

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

[View Example](https://plnkr.co/edit/haqjDvpObbNz757iTgT0?p=preview)

There's five things to notice here:

1. We have changed the name we use to refer to our form from `regForm` to `group` because `regForm` used to be an instance of the `ngForm` directive while `group` is an instance of `ControlGroup`.

2. We are binding our `ControlGroup` instance `group` created by the `FormBuilder`, to the actual HTML form using the special property `[ngFormModel]`.

3. We are binding our `Control` instances using the property `[ngFormControl]` to each of the form fields. We are using the `[ngFormControl]` property instead of the `ngControl` directive because the latter will try to create a new `Control` and not use the ones we have already created in our component.

4. We don't need to export the form or the controls using the syntax `#group="ngForm"` or `#email="ngForm"` because we have already created those variables in our component and thus they are available in the template.

5. We don't need to pass the form object to the `onSubmit` method because we have access to it inside our component in the variable `this.group`.

## Built-in Validators

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

Notice that this time the method `hasError` is being used insted of accessing the `errors` object directly as before. When the field is valid, the `errors` object is `null` so trying to access `email.errors.required` will generate an internal error. We avoid that problem by wrapping our error logic inside an `*ngIf="!email.valid"` so we assure that the errors object exists before trying to render each specific error. This might not always be the case, so it's better to use the `hasError` method to check for a validation error.

## Custom Validators

Having three validators is just not enough, let's create a custom validator to check that our email field has the proper format.

_app/custom-validators.ts_
```javascript
import {Control} from 'angular2/common';

export class CustomValidators {
  static emailFormat(control: Control): [[key: string]: boolean] {
    let pattern:RegExp = /\S+@\S+\.\S+/;
    return pattern.test(control.value) ? null : {"emailFormat": true}; 
  }
}
```

A validator is just a class with a number of static methods. Each method receives a `Control` instance and returns an object in case the validation fails or `null` in case tha validation pass.

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

In the template, we need to look for the same key that is returned by the validator in case of an error, in this case, the key `emailFormat`.

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

[View Example](https://plnkr.co/edit/Q0aUwWF25VUoUnxIQrRL?p=preview)

## Async Validators

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

We can modify again our template to acommodate the new error message.

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

## Models

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

[View Example](https://plnkr.co/edit/TPaJeEB4UvGCWzpCngxx?p=preview)

Using this approach the usual Angular 1, 2-way data binding approach is avoided.

If 2-way data binding is still neeeded, the property syntax can be combined with the event syntax.

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

[View Example](https://plnkr.co/edit/k8G2syqZfpkEi8ese9mn?p=info)

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

[View Example](https://plnkr.co/edit/k8G2syqZfpkEi8ese9mn?p=preview)

We are using two methods of our form component, `find` and `hasError`.

Let's get the instance of the `Control` we are using from the form and in this way, we can do the same validations of state and errors as before.

> **Note:** You may find in some docs the use of a `control` object instead of the method `find` like this: `group.controls['firstName']`. We are avoiding this approach because it will only work when we are dealing with a `ControlGroup` where every control is stored in an object. If we were working with a `ControlArray` this approach will not work because there's not a key to refer to each control. The method `find` is an abstraction that will take care of both situations and will get us the proper control back.
