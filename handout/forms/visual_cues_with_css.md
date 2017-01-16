# Visual Cues with CSS

Angular also offers a way to define special CSS styles that add or remove classes to the form fields dependent on their state and validation following the rules shown in the table below:

Class        | States
------------ | ---------------------------------------
ng-pristine  | `pristine == true` and `dirty == false`
ng-dirty     | `dirty == true` and `pristine == false`
ng-touched   | `touched == true`
ng-untouched | `touched == false`
ng-valid     | `valid == true`
ng-invalid   | `valid == false`

If we want to define a style for an invalid input field, we could define a CSS rule for that.

_styles.css_
```css
.ng-invalid.ng-dirty {
  border-left: 5px solid red;
}
```

We need now to update our _index.html_ file to reference our new stylesheet.

_index.html_
```html
<html>
  <head>
    <!-- ... -->
    <link rel="stylesheet" href="styles.css">
  </head>
  <!-- ... -->
</html>
```

[View Example](http://plnkr.co/edit/EK0xuiM1eIzEfqXrvt7Z?p=preview)

So far all of our validation logic lives in the template and we are doing very basic validation. What if we want to use some custom validation? We need to have more control of our form, and for that we need to use the `FormBuilder`.

<iframe class="no-pdf" style="width: 100%; height: 300px" src="http://embed.plnkr.co/EK0xuiM1eIzEfqXrvt7Z/" frameborder="0" allowfullscren="allowfullscren"></iframe>
