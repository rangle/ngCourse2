# Part 8: Forms

Let's create a very simple component that just renders a form. In our main `index.html` file we use a new html element called `<my-form>`.

`index.html`
```html
<my-form>Loading...</my-form>
```

In order to create this element, we need to define a new component.

`app/my-form.ts`
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

`app/my-form.html`
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

`app/my-form.ts`
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

`app/my-form.html`
```html
<form (ngSubmit)="onSubmit()">
```

We are telling our component that when the form is submitted the method `onSubmit` of our component will be invoked so let's define this method.

`app/my-form.ts`
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

## Getting the value of the form

Right now, our component doesn't know how to get the values introduced in the form's fields. To do that, we need a way to pass an instance of the form when calling the "onSubmit" method on the template.

The NgForm directive, besides of defining a new `ngSubmit` event on the form, is also creating and **exporting** an instance of the NgForm, called unsurprisingly `ngForm`, to be used as a local template variable.

`app/my-form.html`
```html
<form #form="ngForm" (ngSubmit)="onSubmit(form)">
```

Here we are naming `form` our local reference to the `ngForm` instance and passing it to our component in the `onSubmit` method. It's now turn to update the component method to read the values of our form.

`app/my-form.ts`
```javascript
// ...
import {NgForm} from 'angular2/common';

@Component({
// ...
})
class MyForm {
onSubmit(form: NgForm): void {
    console.log(form.value);
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

Let's go back to our code. We now know that our form element has been *upgraded* with the NgForm directive, and because of that, it has created an internal ControlGroup for us to hold a reference to its fields. The same does not apply to the internal fields of the forms, they are not automatically converted into Controls as we might expect. We need to explicitely enhance them using the `ngControl` directive while at the same time, we need to give them a unique name.

`app/my-form.html`
```html
<form #form="ngForm" (ngSubmit)="onSubmit(form)">

<div>
    <label for="firstName">First Name:</label>
    <input type="text" id="firstName" ngControl="firstName">
</div>  

<div>
    <label for="lastName">Last Name:</label>
    <input type="text" id="lastName" ngControl="lastName">
</div>

<button type="submit">Submit</button>
    
</form>
```

When we add the directive ngControl to the fields, angular automatically register these Controls as part of the ControlGroup of the parent form.

Now, if we put the values "John" as first name and "Doe" as last name and click the submit button, we get the correct values on the console.

```javascript
Object {firstName: "John", lastName: "Doe"}
```

## Validation

In order to show validation messages for every field, we need to do a similar trick that the one we did for the form. We need to define a local template variable that is a reference to the Control instance and then check the validity of that instance.

The ngControl directive is a little tricky, first the directive definition is not NgControl but [NgControlName](https://angular.io/docs/ts/latest/api/common/NgControlName-directive.html). Second, the directive itself it's exported to the template with the same name as before: `ngForm`.

`app/my-form.html`
```html
<form ...>
<!-- ... --> 
<input type="text" id="firstName" ngControl="firstName" #firstName="ngForm" required minlength="3">
<!-- ... -->
<input type="text" id="lastName" ngControl="lastName" #lastName="ngForm" required>
<!-- ... -->
</form>
```

Here we have defined two local template variables and also we defined a couple of built-in validators like `required` and `minlength`. The only other built-in validator available for an input field is `maxlength` wich we are not going to use in this example.

With these two validators we can then show or hide error messages for each field.

`app/my-form.html`
```html
<form ...>

<div>
    <!-- ... -->
    <ul *ngIf="firstName.dirty && !firstName.valid">
    <li *ngIf="firstName.errors.required">This field is required</li>
    <li *ngIf="firstName.errors.minlength">This field needs to have at least 3 characterss</li>
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

It's worth noting that Control, ControlGroup and ControArray all inherit from [AbstractControl](https://angular.io/docs/ts/latest/api/common/AbstractControl-class.html) and because of this they share the same API to get values, errors and check the internal state (valid, dirty). For that reason, we can also check the validity of the form as a whole to disabled or enabled the submit button.

`app/my-form.html`
```html
<form ...>
<!-- ... -->
<button type="submit" [disabled]="!form.valid">Submit</button>
</form>
```

So far all of our validation logic lives in the template and we are doing very basic validation. What if we want to use some custom validation? We need to have more control of our form and for that, we need to use the `FormBuilder`.

## FormBuilder

The [FormBuilder](https://angular.io/docs/ts/latest/api/common/FormBuilder-class.html) is a class that allows us to create a form programatically. To use it in our component, we need to inject it in the constructor.

`app/my-form.ts`
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

`app/my-form.ts`
```javascript
// ...
import {ControlGroup} from 'angular2/common';
import {Control} from 'angular2/common';

// ...
class MyForm {
firstName: Control;
lastName: Control;
form: ControlGroup;

constructor(builder: FormBuilder) {
    this.firstName = new Control();
    this.lastName = new Control();
    
    this.form = builder.group({
    firstName: this.firstName,
    lastName: this.lastName
    });
}
}
// ...
```

We have created programatically a new form using the FormBuilder with two fields: firstName and lastName. Now we need to go back to our form template to change a few things. We are going to remove the validation temporary because we have not defined the validators yet using this new approach.

`app/my-form.html`
```html
<form [ngFormModel]="form" (ngSubmit)="onSubmit()">

<div>
    <label for="firstName">First Name:</label>
    <input type="text" id="firstName" ngControl="firstName">
</div>

<div>
    <label for="lastName">Last Name:</label>
    <input type="text" id="lastName" ngControl="lastName">
</div>

<button type="submit">Submit</button>
</form>
```

There's four things to notice here:

1. We are binding our ControlGroup instance `this.form` created by the FormBuilder, to the actual HTML form using the special property `[ngFormModel]`.

2. We don't need to export the form or the controls using a sintax like `#form="ngForm"` or `#firstName="ngForm"` because we have already created those variables in our component and thus they are available in the template.

3. We don't need to pass the form object to the `onSubmit` method because we have access to it inside our component in the variable `this.form`.

4. The value of the directive `ngControl` should match the keys of the properties passed to the FormBuilder's group method. For example, if we have defined something like:

```javascript
this.form = builder.group({
firstNameInput: this.firstName,
lastNameInput: this.lastName
});
```

Then we need to bind those variables in the template using the same keys.

```html
<input type="text" id="firstName" ngControl="firstNameInput">
<input type="text" id="lastName" ngControl="lastNameInput">
```

### Adding Built-in validators

In contrast with our first approach, we are not going to be using the HTML properties `required` and `minlength`, instead we are going to pass these validators to the Control constructor of both fields.

`app/my-form.ts`
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
    console.log(this.form.value);
}
}
// ...
```

The first value of the Control constructor is the default value for the field, in this case we are leaving it empty. The second argument is the validator that should apply to the field. 

The `Validator` class gives us access to the three built-in validators `require`, `minLength` and `maxLength`. If more than one validator is needed for a field, we need to combine them using the method `compose` as shown in the example before.

Now that our validators are in place, we can add again the template to show the error messages.

`app/my-form.html`
```html
<form ...>

<div>
    <!-- ... -->
    <ul *ngIf="firstName.dirty && !firstName.valid">
    <li *ngIf="firstName.errors.required">This field is required</li>
    <li *ngIf="firstName.errors.minlength">This field needs to have at least 3 characterss</li>
    </ul>
</div>

<div>
    <!-- ... -->
    <ul *ngIf="lastName.dirty && !lastName.valid">
    <li *ngIf="lastName.errors.required">This field is required</li>
    </ul>
</div>

<button type="submit" [disabled]="!form.valid">Submit</button>
</form>
```

### Custom Validators

Having three validators is just not enough, let's create a custom validator to check that a particular field does not include numbers.

`app/my-form.ts`
```javascript
class CustomValidator {
static noNumbers(control: Control): {[key: string]: boolean} {
    let pattern = /[0-9]/;
    return pattern.test(control.value) ? {"noNumbers": true} : null; 
}
}
```

A validator is just a class with a number of static methods. Each method receives a Control instance and returns an object in case the validation fails or `null` in case tha validation pass.

We can now add the validator in our component logic and add a new item in our HTML to show this error.

`app/my-form.ts`
```javascript
// ...
class CustomValidator {
// ...  
}
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

`app/my-form.html`
```html
<form ...>
<!-- ... -->
<div>
    <!-- ... -->
    <ul *ngIf="lastName.dirty && !lastName.valid">
    <li *ngIf="lastName.errors.required">This field is required</li>
    <li *ngIf="lastName.errors.noNumbers">This field doesn't allow numbers</li>
    </ul>
</div>
<!-- ... -->
</form>
```