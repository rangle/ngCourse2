# Creating a Form with Directives

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

<iframe style="width: 100%; height: 600px" src="http://embed.plnkr.co/DzBxhlzGLb3fg3rtPGnx" frameborder="0" allowfullscren="allowfullscren"></iframe>


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

