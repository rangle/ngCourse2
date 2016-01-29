# Getting the Form's Values

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

Even if we fill both inputs and click the submit button, we get an empty object in the console. To understand what's happening we need to stop for a moment to review some core concepts about forms in Angular 2 before moving on with our code example.

[View Example](https://plnkr.co/edit/fo4ZXG9IAcEqtYgT6dJs?p=preview)

<iframe style="width: 100%; height: 300px" src="https://embed.plnkr.co/fo4ZXG9IAcEqtYgT6dJs" frameborder="0" allowfullscren="allowfullscren"></iframe>


