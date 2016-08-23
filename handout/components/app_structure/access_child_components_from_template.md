# Access Child Components From the Template
In our templates, we may find ourselves needing to access values provided by the child components which we use to build our own component.

The most straightforward examples of this may be seen dealing with forms or inputs:

_app/my-example.component.html_
```html
<section >
  <form #myForm="ngForm" (ngSubmit)="submitForm(myForm)">
    <!-- ... -->
  </form>
</section>
```


_app/my-example.component.ts_
```ts
// ...
import {NgForm} from '@angular/forms';
// ...
export class MyExampleComponent {
  submitForm (form: NgForm) {
    // ...
  }
}
```
[View Example](https://plnkr.co/edit/MFaLMCbLOIXfNhYWT9ni?p=preview)

This isn't just a magic feature which only forms have.

```html
<red-ball #myBall></red-ball>
The ball is {{ myBall.color }}.
```

By assigning a Template Reference Variable to a component, you can read properties from it, call methods on it, or pass the instance into your own method calls (as the form was passed in, above).

There are better means of dealing with complex tasks, which might require you to convey information to the child, or interact with its interface; however, if you find yourself simply needing to reference properties extended by the child, for use in your template, or to pass a value from a child to your method, in an action, this is a straightforward approach.
