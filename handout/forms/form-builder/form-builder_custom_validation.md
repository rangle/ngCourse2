# FormBuilder Custom Validation

As useful as the built-in validators are, it is very useful to be able to include your own.
Angular 2 allows you to do just that, with minimal effort.

Let's assume we are using the same Login Form, but now we also want to test that our password has an exclamation mark somewhere in it.

_app/login-form.component.ts_
```ts
function hasExclamationMark (input: FormControl) {
  const hasExclamation = input.value.indexOf('!') >= 0;
  return hasExclamation ? null : { needsExclamation: true };
}


// ...
this.password = new FormControl('', [
  Validators.required,
  hasExclamationMark
]);
```

I've created a simple function which takes the `FormControl` instance and returns null if everything is fine.
If the test fails, it returns an object with an arbitrarily named property.
The property name is what will be used for the `.hasError()` test.

_app/login-form.component.ts_
```html
<!-- ... -->
<div [hidden]="!password.hasError('needsExclamation')">
  Your password must have an exclamation mark!
</div>
<!-- ... -->
```

[View Example](https://plnkr.co/edit/t3Ut3P?p=preview)

### Predefined Parameters
Having a custom validator check for exclamation marks might be helpful, but what if you need to check for some other form of punctuation?
It might be overkill to write nearly the same thing over and over again.

Consider the earlier example `Validators.minLength(5)`.
How did they get away with allowing you to pass in an argument to control the length, if a validator is just a function?
Simple, really.
It's not a trick of Angular, or TypeScript.
It's simple JavaScript closures.

```javascript
function minLength (minimum) {
  return function (input) {
    return input.value >= minimum ? null : { minLength: true };
  };
}
```

I have a function which takes a "minimum" parameter, and returns another function. The function defined and returned from the inside becomes my validator. My closure reference allows me to remember the value of the minimum, when the validator is eventually called.


Let's apply that thinking back to a `PunctuationValidator`.

_app/login-form.component.ts_
```ts
function hasPunctuation (punctuation: string, errorType: string) {
  return function (input: FormControl) {
    return input.value.indexOf(punctuation) >= 0 ?
        null :
        { [errorType]: true };
  };
}

// ...

this.password = new FormControl('', [
  Validators.required,
  hasPunctuation('&', 'ampersandRequired')
]);
```

_app/login-form.component.html_
```html
<!-- ... -->
<div [hidden]="!password.hasError('ampersandRequired')">
  You must have an &amp; in your password.
</div>
<!-- ... -->
```

[View Example](https://plnkr.co/edit/9tWvhy?p=preview)

### Validating Inputs Using Other Inputs
Keep in mind what was mentioned earlier: inputs have access to their parent context via `.root`.
Therefore, complex validation can happen by drilling through the form, via root.

```ts
function duplicatePassword (input: FormControl) {
  if (!input.root || !input.root.controls) {
    return null;
  }

  const exactMatch = input.root.controls.password === input.value;
  return exactMatch ? null : { mismatchedPassword: true };
}

// ...
this.duplicatePassword = new FormControl('', [
  Validators.required,
  duplicatePassword
]);
```

[View Example](https://plnkr.co/edit/lMVp52?p=preview)
