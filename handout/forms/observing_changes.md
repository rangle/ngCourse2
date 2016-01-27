# Observing Changes

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