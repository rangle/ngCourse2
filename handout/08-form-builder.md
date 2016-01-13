# Part 8: Forms

Let's create a very simple component that just renders a form. In our main `index.html` file we are going to define a new html element called `<my-form>`.

*index.html*
```html
<my-form>Loading...</my-form>
```

In order to create this element, we need to define a new component.

*app/my-form.component.ts*
```javascript
import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

@Component({
  selector: 'my-form',
  templateUrl: 'app/my-form.html'
})
class MyForm {}

bootstrap(MyForm);
```

And finally, define the component's template as a separate file for easier visualization.

*app/my-form.html*
```html
<form>

  <div>
    <label for="firstName">First Name:</label>
    <input type="text" id="firstName">
  </div>

  <div>
    <label for="lastName">Last Name:</label>
    <input type="text" id="lastName">
  </div>

  <button type="submit">Submit</button>

</form>
```

At this point, if we click the submit button nothing happens because we defined a standard HTML form, not an angular2 form. To fix that, we need to tell our component to upgrade our form using the `NgForm` directive wich will give us access to new properties and event bindings on our form to interact with it.

*app/my-form.component.ts*
```javascript
// ...
import {FORM_DIRECTIVES} from 'angular2/common';

@Component({
  // ...
  directives: [FORM_DIRECTIVES]
})
class MyForm {}
```

Notice that we didn't include the NgForm directly, instead we included [FORM_DIRECTIVES](https://angular.io/docs/ts/latest/api/common/FORM_DIRECTIVES-let.html) which is an array of all the directives used in forms, including NgForm. To see all the directives included in this array, check the [source code](https://github.com/angular/angular/blob/2.0.0-beta.0/modules/angular2/src/common/forms/directives.ts#L52-L71).

Because we now have an angular2 form, we can listen to the `ngSubmit` event which is triggered whenever the form is submitted.

*app/my-form.html*
```html
<form (ngSubmit)="onSubmit()">
```

We are telling our component that when the form is submitted, the `onSubmit` method of our component will be invoked, so let's define this method.

*app/my-form.component.ts*
```javascript
@Component({
  // ...
})
class MyForm {
  onSubmit(): void {
    console.log('Form submitted!');
  }
}
```

Now when we click the submit button, we can see in the console the message "Form submitted!".

## Getting the form's values

Right now, our component doesn't know how to get the values introduced in the form's fields. To do that, we need a way to pass an instance of the form when calling the "onSubmit" method on the template.

The NgForm directive, besides of defining a new `ngSubmit` event on the form, is also creating and **exporting** an instance of the NgForm directive, called unsurprisingly `ngForm`, to be used as a local template variable.

*app/my-form.html*
```html
<form #regForm="ngForm" (ngSubmit)="onSubmit(regForm)">
```

Here we are naming `regForm` (short for "registration form") our local reference to the NgForm directive instance and passing it to our component in the `onSubmit` method. It's now time to update the component method to read the values of our form.

*app/my-form.component.ts*
```javascript
// ...
import {NgForm} from 'angular2/common';

@Component({
  // ...
})
class MyForm {
  onSubmit(regForm: NgForm): void {
    console.log(regForm.value);
  }
}
```

Even if we fill both inputs and click the submit button, we get an empty object in the console. To understand what's happening we need to stop for a moment to review some core concepts about forms in angular2 before moving on with our code example.

## Control Grouping

In angular2, there are three basic built-in classes that help us manage forms:

- Control
- ControlGroup
- ControlArray

A [Control](https://angular.io/docs/ts/latest/api/common/Control-class.html) is the most basic unit of a form and it's associated with individual fields of a form. Through a Control we can know the field's value, its state (whether or not is valid or has been changed), and its errors.

A [ControlGroup](https://angular.io/docs/ts/latest/api/common/ControlGroup-class.html) is a collection of Controls of fixed length. A ControlGroup is useful to define the validity of the group of controls as a whole, without the need to iterate through all of them manually to check if all are valid or not.

**When we define a form using the NgForm directive, automatically every form element creates an internal ControlGroup to hold all of the Controls inside of it.**

A [ControlArray](https://angular.io/docs/ts/latest/api/common/ControlArray-class.html) is exactly the same as a ControlGroup but with a variable length.

In the previous example, the exported template variable that we are getting from:

```html
<form #regForm="ngForm" ...>
```

Is in fact an instance of the NgForm directive, not directly an instance of the ControlGroup class. To get to the ControlGroup instance created internally by the NgForm directive, we need to access the property `regForm.form`.

Let's go back to our code. We now know that our form element has been *upgraded* with the NgForm directive, and because of that, it has created an internal ControlGroup for us to hold a reference to its child Controls. The problem is that at this point angular doesn't recognize the nested fields as Controls belonging to the form. To make this association explicit, we need to use the directive `ngControl` on our form fields.

*app/my-form.html*
```html
<form ...>
  
  <div>
    <label for="firstName">First Name:</label>
    <input type="text" id="firstName" ngControl="firstName">
  </div>
  
  <div>
    <label for="lastName">Last Name:</label>
    <input type="text" id="lastName" ngControl="lastName">
  </div>
  
  <!-- ... -->
</form>
```

When we add the directive ngControl to the fields, angular automatically registers these Controls as part of the ControlGroup of the parent form.

Now, if we put the values "John" as first name and "Doe" as last name and click the submit button, we get the correct values on the console.

```javascript
Object {firstName: "John", lastName: "Doe"}
```

## Validation

In order to show validation messages for every field, we need to do a similar trick that the one we did for the form. We need to define a local template variable that is a reference to the directive itself.

The ngControl directive is a little tricky, first the directive definition is not called NgControl but [NgControlName](https://angular.io/docs/ts/latest/api/common/NgControlName-directive.html). Second, the directive itself it's exported to the template with the same name as before: `ngForm`.

*app/my-form.html*
```html
<form ...>
  <div>
    <!-- ... -->
    <input type="text" id="firstName" ngControl="firstName" #firstName="ngForm" required minlength="3">
  </div>
  
  <div>
    <!-- ... -->
    <input type="text" id="lastName" ngControl="lastName" #lastName="ngForm" required>
  </div>
  <!-- ... -->
</form>
```

Here we have defined two local template variables and also we defined a couple of built-in validators like `required` and `minlength`. The only other built-in validator available for an input field is `maxlength` wich we are not going to use in this example.

> Note: When exporting a directive using for example `#firstName="ngForm"`, we are getting an instance of the directive `NgControlName`. To access the Control instance of the field, we need to get the property `control` like for example `firstName.control`.

With these two validators we can then show or hide error messages for each field.

*app/my-form.html*
```html
<form ...>

  <div>
    <!-- ... -->
    <ul *ngIf="firstName.dirty && !firstName.valid">
      <li *ngIf="firstName.errors.required">This field is required</li>
      <li *ngIf="firstName.errors.minlength">This field needs to have at least 3 characters</li>
    </ul>
  </div>

  <div>
    <!-- ... -->
    <ul *ngIf="lastName.dirty && !lastName.valid">
      <li *ngIf="lastName.errors.required">This field is required</li>
    </ul>
  </div>

  <button type="submit">Submit</button>
</form>
```

We have at our disposal access to the validity of each field using the property `valid`, the state with `dirty`, `touched` and `pristine` and particular errors based on the validators applied inside the object `errors`.

It's worth noting that Control, ControlGroup and ControlArray all inherit from [AbstractControl](https://angular.io/docs/ts/latest/api/common/AbstractControl-class.html) and because of this they share the same API to get values, errors and check the internal state (valid, dirty). For that reason, we can also check the validity of the form as a whole to disabled or enabled the submit button.

*app/my-form.html*
```html
<form ...>
  <!-- ... -->
  <button type="submit" [disabled]="!form.valid">Submit</button>
</form>
```

## Visual cues with CSS

Angular also offers a way to define special CSS styles adding or removing classes to the form fields dependent on its state and validation.

Class        | Meaning
------------ | ------------------------------------------------------------------
ng-pristine  | The field has just been rendered and hasn't been modified
ng-dirty     | The field has been modified
ng-untouched | The field has not been modified since the last time it lost focus
ng-touched   | The field has been modified and has lost focus
ng-valid     | The field is passing all the validators
ng-invalid   | The field is not passing at least one validator

If we want to define a style for an invalid input field, we could define a CSS rule for that.

*styles.css*
```css
.ng-invalid.ng-dirty {
  border-left: 5px solid red;
}
```

We need now to update our `index.html` file to reference our new stylesheet.

*index.html*
```html
<html>
  <head>
    <!-- ... -->
    <link rel="stylesheet" href="styles.css">
  </head>
  <!-- ... -->
</html>
```

So far all of our validation logic lives in the template and we are doing very basic validation. What if we want to use some custom validation? We need to have more control of our form and for that, we need to use the `FormBuilder`.

## FormBuilder

The [FormBuilder](https://angular.io/docs/ts/latest/api/common/FormBuilder-class.html) is a class that allows us to create a form programatically. To use it in our component, we need to inject it in the constructor.

*app/my-form.component.ts*
```javascript
// ...
import {FormBuilder} from 'angular2/common';

// ...
class MyForm
  constructor(builder: FormBuilder) {}
}
// ...
```

The FormBuilder class has a factory method called `group` that creates a ControlGroup instance that requires, as arguments, the `Controls` to defined the fields of the form.

*app/my-form.component.ts*
```javascript
// ...
import {ControlGroup} from 'angular2/common';
import {Control} from 'angular2/common';

// ...
class MyForm {
  firstName: Control;
  lastName: Control;
  regForm: ControlGroup;

  constructor(builder: FormBuilder) {
    this.firstName = new Control();
    this.lastName = new Control();

    this.regForm = builder.group({
      firstName: this.firstName,
      lastName: this.lastName
    });
  }
}
// ...
```

We have created programatically a new form using the FormBuilder with two fields: firstName and lastName.

> Note: There is a subtle difference than before. Notice that now `this.regForm` is an instance of `ControlGroup`, not a reference to the `NgForm` directive as before.

Now we need to go back to our form template to change a few things. We are going to remove the validation temporarily because we have not defined the validators yet using this new approach.

*app/my-form.html*
```html
<form [ngFormModel]="regForm" (ngSubmit)="onSubmit()">

  <div>
    <label for="firstName">First Name:</label>
    <input type="text" id="firstName" [ngFormControl]="firstName">
  </div>

  <div>
    <label for="lastName">Last Name:</label>
    <input type="text" id="lastName" [ngFormControl]="lastName">
  </div>

  <button type="submit">Submit</button>
</form>
```

There's four things to notice here:

1. We are binding our ControlGroup instance `this.regForm` created by the FormBuilder, to the actual HTML form using the special property `[ngFormModel]`. We are using the `[ngFormModel]` property instead of the `ngForm` directive because the latter will try to create a new ControlGroup (the form) and not use the one we have already created in our component.

2. We are binding our Controls instances using the property `[ngFormControl]` to each of the form fields. Similar to the form, we are using the `[ngFormControl]` property instead of the `ngControl` directive because the latter will try to create a new Control and not use the ones we have already created in our component.

3. We don't need to export the form or the controls using the syntax `#regForm="ngForm"` or `#firstName="ngForm"` because we have already created those variables in our component and thus they are available in the template.

4. We don't need to pass the form object to the `onSubmit` method because we have access to it inside our component in the variable `this.regForm`.

## Built-in validators

In contrast with our first approach, we are not going to be using the HTML properties `required` and `minlength`, instead we are going to pass these validators to the Control constructor of both fields.

*app/my-form.component.ts*
```javascript
// ...
import {Validators} from 'angular2/common';

// ...
class MyForm {
  // ...
  constructor(builder: FormBuilder) {
    this.firstName = new Control('', Validators.compose([Validators.required, Validators.minLength(3)]));
    this.lastName = new Control('', Validators.required);
    // ...
  }

  onSubmit(): void {
    console.log(this.regForm.value);
  }
}
// ...
```

The first (optional) value of the Control constructor is the default value for the field, in this case we are leaving it empty. The second argument is the validators that should apply to the field.

The `Validator` class gives us access to the three built-in validators `require`, `minLength` and `maxLength`. If more than one validator is needed for a field, we need to combine them using the method `compose` as shown in the example before.

Now that our validators are in place, we can add again the template to show the error messages.

*app/my-form.html*
```html
<form ...>

  <div>
    <!-- ... -->
    <ul *ngIf="firstName.dirty && !firstName.valid">
      <li *ngIf="firstName.hasError('required')">This field is required</li>
      <li *ngIf="firstName.hasError('minlength')">This field needs to have at least 3 characters</li>
    </ul>
  </div>

  <div>
    <!-- ... -->
    <ul *ngIf="lastName.dirty && !lastName.valid">
      <li *ngIf="lastName.hasError('required')">This field is required</li>
    </ul>
  </div>

  <!-- ... -->
</form>
```

Notice that this time the method `hasError` is being used insted of accessing the `errors` object directly as before. When the field is valid, the `errors` object is `null` so trying to access `firstName.errors.required` will generate an internal error. We avoid that problem by wrapping our error logic inside an `*ngIf="!firstName.valid"` so we assure that the errors object exists before trying to render each specific error. This might not always be the case, so it's better to use the `hasError` method to check for a validation error.

## Custom Validators

Having three validators is just not enough, let's create a custom validator to check that a particular field does not include numbers.

*app/validators.ts*
```javascript
import {Control} from 'angular2/common';

export class CustomValidator {
  static noNumbers(control: Control): {[key: string]: boolean} {
    let pattern:RegExp = /[0-9]/;
    return pattern.test(control.value) ? {"noNumbers": true} : null;
  }
}
```

A validator is just a class with a number of static methods. Each method receives a Control instance and returns an object in case the validation fails or `null` in case tha validation pass.

We can now add the validator in our component logic and add a new item in our HTML to show this error.

*app/validators.ts*
```javascript
// ...
import {CustomValidator} from './validators';

// ...
class MyForm {
  // ...
  constructor(builder: FormBuilder) {
    // ...
    this.lastName = new Control('', Validators.compose([Validators.required, CustomValidator.noNumbers]));
    // ...
  }
  // ...
}
// ...
```

In the template, we need to look for the same key that is returned by the validator in case of an error, in this case, the key `noNumbers`.

*app/my-form.html*
```html
<form ...>
  <!-- ... -->
  <div>
    <!-- ... -->
    <ul *ngIf="lastName.dirty && !lastName.valid">
      <li *ngIf="lastName.hasError('required')">This field is required</li>
      <li *ngIf="lastName.hasError('noNumbers')">This field doesn't allow numbers</li>
    </ul>
  </div>
  <!-- ... -->
</form>
```

## Async validators

Until this point, our validation logic is living in the frontend, but what happens if we want to check for some logic that only exists in the server? For example, let's say that for some obscure reason, we want to validate that the value of the field `firstName` does not exist yet in our database and we want to alert the user as he/she types. That's when the async validator comes in handy.

Our new async validator is going to live inside the `CustomValidator` class and the return value of the static method is going to be exactly the same as the method `noNumbers` so before writing our now validation rule, let's do a simple refactoring to clean the code a little bit. 

*app/validators.ts*
```javascript
// ...

interface IValidation {
  [key: string]: boolean;
}

export class CustomValidator {
  static noNumbers(control: Control): IValidation {
    let pattern:RegExp = /[0-9]/;
    return pattern.test(control.value) ? {"noNumbers": true} : null;
  }
}
```

We have created an interface to define the return value of our methods so we can use the same interface with our new validator.

An async validator must return a promise that should resolve to an object with the error when our server responds with a failed validation, or should resolve to null when the server responds with a successful validation.

*app/validators.ts*
```javascript
// ...

export class CustomValidator {
  // ...
  static duplicated(control: Control): Promise<IValidation> {
    let q:Promise<IValidation> = new Promise((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'David') {
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

*app/my-form.component.ts*
```javascript
// ...
class MyForm {
  // ...
  constructor(builder: FormBuilder) {
    this.firstName = new Control('', Validators.compose([Validators.required, Validators.minLength(3)]), CustomValidator.duplicated);
    // ...
  }
  // ...
}
// ...
```

We can modify again our template to acommodate the new error message.

*app/my-form.html*
```html
<form ...>
  <div>
    <label for="firstName">First Name:</label>
    <input type="text" id="firstName" [ngFormControl]="firstName">
    <span *ngIf="firstName.pending">Checking duplication...</span>
    <ul ...>
      <!-- ... -->
      <li *ngIf="firstName.hasError('duplicated')">This value cannot be used</li>
    </ul>
  </div>
  <!-- ... -->
</form>
```

Notice that not only we have a new error key but our field has a new state called `pending` that is `true` when angular waits for the promise to be resolved and `false` otherwise. That way we can give feedback to the user that some validation is being performed in the background that could take a while to finish.

## Observing changes

The `ControlGroup` and `Control` components both behave as observables, meaning that we can subscribe to their streams in order to "watch" changes in the form values.

*app/my-form.component.ts*
```javascript
// ...
class MyForm {
  // ...
  constructor(builder: FormBuilder) {
    // ...
    this.firstName.valueChanges.subscribe((value: string) => {
      console.log('firstName', value);
    });
    this.lastName.valueChanges.subscribe((value: string) => {
      console.log('lastName', value);
    });
    this.regForm.valueChanges.subscribe((value: any) => {
      console.log('form', value);
    });
  }
  // ...
}
// ...
```

While the subscriber for the fields receives the values as strings, the form subscriber receives its value as an object representing the entire information introduced in the form. Every time the user changes the value of any of the fields, the corresponding field subscriber is invoked as well as the form subscriber.

## Models

So far the form only gets information from the user. What if there's a need to edit an existing model? The property `[ngModel]` exists just for that.

First, a model needs to be defined as a new class.

*app/person.model.ts*
```javascript
export class Person {
  public firstName: string;
  public lastName: string;
  
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  getCompleteName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
```

In order to use it in the `MyForm` component, an instance of the `Person` class needs to be defined.

*app/my-form.component.ts*
```javascript
// ...
import {Person} from './person.model';

// ...
class MyForm {
  person: Person;
  // ...
  constructor() {
    this.person = new Person('John', 'Doe');
    // ...
  }
  // ...
}
// ...
```

With this instance, the property `[ngModel]` can be used in the template to bind the value of the field to the model.

*app/my-form.html*
```html
<form ...>
  <div>
      <!-- ... -->
      <input type="text" id="firstName" [ngFormControl]="firstName" [ngModel]="person.firstName">
      <!-- ... -->
  </div>
  <div>
      <!-- ... -->
      <input type="text" id="lastName" [ngFormControl]="lastName" [ngModel]="person.lastName">
      <!-- ... -->
  </div>
  <p><label>Complete Name:</label> {{ person.getCompleteName() }}</p>
  <!-- ... -->
</form>
```

Notice that when changing the values of the forms, the "Complete Name" displayed is not being updated accordingly, that's because the property binding `[ngModel]` implements one way data binding. To close the circle, the component can be modified as well to update the model on submit.

*app/my-form.component.ts*
```javascript
// ...
class MyForm {
  // ...
  onSubmit(): void {
    this.person.firstName = this.regForm.value.firstName;
    this.person.lastName = this.regForm.value.lastName; 
  }
}
// ...
```

Using this approach the usual angular1 2-way data binding approach is avoided.

If 2-way data binding is still neeeded, the property syntax can be combined with the event syntax.

*app/my-form.html*
```html
<form ...>
  <div>
    <!-- ... -->
    <input type="text" id="firstName" [ngFormControl]="firstName" [(ngModel)]="person.firstName">
    <!-- ... -->
  </div>
  <div>
    <!-- ... -->
    <input type="text" id="lastName" [ngFormControl]="lastName" [(ngModel)]="person.lastName">
    <!-- ... -->
  </div>
  <!-- ... -->
</form>
```

Now, the model is being updated any time the form is being changed.

## Alternative Syntax

When dealing with a very long form, creating a variable for every field in the form can be tedious. Angular2 provides an alternative syntax to creating a form using the FormBuilder.

*app/my-form.component.ts*
```javascript
// ...
class MyForm {
  regForm: ControlGroup;

  constructor(builder: FormBuilder) {
    this.regForm = builder.group({
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(3)]), CustomValidator.duplicated],
      lastName: ['', Validators.compose([Validators.required, CustomValidator.noNumbers])]
    });
    
    this.regForm.find('firstName').valueChanges.subscribe((value: string) => {
      console.log('firstName', firstName);
    });
    // ...
  }
  //...
}
// ...
```

Instead of assigning our Controls to every key in the group method, we now pass an array where every element is a map of the arguments present in the Control constructor.

Because now we don't have access to every control in our template, we need to resort in the form itself to do the validation for each field.

*app/my-form.html*
```html
<form ...>
  <div>
    <!-- ... -->
    <input type="text" id="firstName" [ngFormControl]="regForm.find('firstName')">
    <span *ngIf="regForm.find('firstName').pending">Checking duplication...</span>

    <ul *ngIf="regForm.find('firstName').dirty && !regForm.find('firstName').valid">
      <li *ngIf="regForm.hasError('required', 'firstName')">This field is required</li>
      <li *ngIf="regForm.hasError('minlength', 'firstName')">This field needs to have at least 3 characters</li>
      <li *ngIf="regForm.hasError('duplicated', 'firstName')">This value cannot be used</li>
    </ul>
  </div>

  <div>
    <!-- ... -->
    <input type="text" id="lastName" [ngFormControl]="regForm.find('lastName')">

    <ul *ngIf="regForm.find('lastName').dirty && !regForm.find('lastName').valid">
      <li *ngIf="regForm.hasError('required', 'lastName')">This field is required</li>
      <li *ngIf="regForm.hasError('noNumbers', 'lastName')">This field doesn't allow numbers</li>
    </ul>
  </div>
  <!-- ... -->
</form>
```

We are using two methods of our form component, `find` and `hasError`.

Find let's get the instance of the Control we are using from the form and in this way, we can do the same validations of state and errors as before.

> Note: You may find in some docs the use of a `control` object instead of the method `find` like this: `form.controls['firstName']`. We are avoiding this approach because it will only work when we are dealing with a `ControlGroup` where every control is stored in an object. If we were working with a `ControlArray` this approach will not work because there's not a key to refer to each control. The method `find` is an abstraction that will take care of both situations and will get us the proper control back.