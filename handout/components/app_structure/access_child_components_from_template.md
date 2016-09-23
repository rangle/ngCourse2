# Access Child Components From the Template
In our templates, we may find ourselves needing to access values provided by the child components which we use to build our own component.

The most straightforward examples of this may be seen dealing with forms or inputs:

_app/my-example.component.html_
```html
<section >
  <form #myForm="ngForm" (ngSubmit)="submitForm(myForm)">
    <label for="name">Name</label>
    <input type="text" name="name" id="name" ngModel>
    <button type="submit">Submit</button>
  </form>
</section>
```


_app/my-example.component.ts_
```ts
import {Component} from '@angular/core';

@Component({
  selector: 'my-example',
  templateUrl: 'app/my-example.component.html'
})
export class MyExampleComponent {
  submitForm (form: NgForm) {
    console.log(form.value);
  }
}
```
[View Example](https://plnkr.co/edit/TH2x5b?p=preview)

This isn't a magic feature which only forms or inputs have, but rather a way of referencing the instance of a child component in your template. With that reference, you can then access public properties and methods on that component.

```html
<red-ball #myBall></red-ball>
The ball is {{ myBall.color }}.
```

```ts
@Component({
  selector: 'red-ball',
  template: '<div > · </div>'
})
export class RedBallComponent {
  color: string = 'red'
}
```
[View Example](https://plnkr.co/edit/0SXR28?p=preview)

There are other means of accessing and interfacing with child components, but if you simply need to reference properties or methods of a child, this can be a simple and straightforward method of doing so.
