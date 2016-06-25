# Control Grouping

In Angular 2, there are three basic built-in classes that help us to manage forms:

- `Control` - A [Control](https://angular.io/docs/ts/latest/api/common/Control-class.html) is the most basic unit of a form, associated with individual fields of a form. Through a `Control` we can know the field's value, its state (whether or not is valid or has been changed), and its errors.
- `ControlGroup` - A [ControlGroup](https://angular.io/docs/ts/latest/api/common/ControlGroup-class.html) is a collection of `Control`s of fixed length. A `ControlGroup` is useful to define the validity of the group of controls as a whole, rather than validating each of them manually.

    **When we define a form using the `NgForm` directive, automatically every form element creates an internal `ControlGroup` to hold all the `Control`s inside of it.**
- `ControlArray` - A [ControlArray](https://angular.io/docs/ts/latest/api/common/ControlArray-class.html) is the same as a `ControlGroup` but with a variable length.

In the previous example, the exported template variable that we are getting from:

```html
<form #regForm="ngForm" ...>
```

is in fact an instance of the `NgForm` directive, not directly an instance of the `ControlGroup` class. To get to the `ControlGroup` instance created internally by the `NgForm` directive, we need to access the property `regForm.form`.

Let's go back to our code. We now know that our form element has been upgraded with the `NgForm` directive, and because of that it has created an internal `ControlGroup` for us to hold a reference to its child controls. The problem is that at this point Angular doesn't recognize the nested fields as controls belonging to the form. To make this association explicit, we must use the directive `ngControl` on our form fields.

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

When we add the directive `ngControl` to the fields, Angular automatically registers these controls as part of the `ControlGroup` of the parent form.

Now, if we put the values "joe.satriani@gmail.com" as email and "secretpass" as password and click the register button, we get the correct values on the console.

```javascript
Object {email: "joe.satriani@gmail.com", password: "secretpass"}
```

[View Example](http://plnkr.co/edit/Bp6s20luCdLnDCT98FO4?p=preview)
