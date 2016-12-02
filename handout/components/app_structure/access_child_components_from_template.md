# Access Child Components From the Template
In our templates, we may find ourselves needing to access values provided by the child components which we use to build our own component.

The most straightforward examples of this may be seen dealing with forms or inputs:

_app/app.component.html_
```html
<section >
  <form #myForm="ngForm" (ngSubmit)="onSubmit(myForm)">
    <label for="name">Name</label>
    <input type="text" name="name" id="name" ngModel>
    <button type="submit">Submit</button>
  </form>
  Form Value: {{formValue}}
</section>
```


_app/app.component.ts_
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'rio-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent {
  formValue = JSON.stringify({});

  onSubmit (form: NgForm) {
    this.formValue = JSON.stringify(form.value);
  }
}
```
[View Example](https://plnkr.co/edit/hfv5RC?p=preview)

This isn't a magic feature which only forms or inputs have, but rather a way of referencing the instance of a child component in your template. With that reference, you can then access public properties and methods on that component.

_app/app.component.html_
```html
<rio-profile #profile></rio-profile>
My name is {{ profile.name }}
```

_app/profile.component.ts_
```ts
@Component({
  selector: 'rio-profile',
  templateUrl: 'app/profile.component.html'
})
export class ProfileComponent {
  name = 'John Doe';
}
```
[View Example](https://plnkr.co/edit/wEFOta?p=preview)

There are other means of accessing and interfacing with child components, but if you simply need to reference properties or methods of a child, this can be a simple and straightforward method of doing so.
