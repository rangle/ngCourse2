# Getting Started


### Opt-In APIs
Before we dive into any of the form features, we need to do a little bit of housekeeping.
If you are using a current release candidate version of Angular 2, you must add two `Provider` imports to your `bootstrap`.

```js
import {bootstrap} from "@angular/core";
// ...
import {disableDeprecatedForms, provideForms} from "@angular/forms";

bootstrap(MyApp, [
  // ...
  disableDeprecatedForms(),
  provideForms()
]);
```


> This override will be deprecated in future releases


### Input Labeling

The majority of the form examples will use the following HTML5 style for labeling inputs:

```html
<label for="name">Name</label>
<input type="text" name="username" id="username">
```

Angular 2 also supports the alternate HTML5 style, which precludes the necessity of `id`s on `<input>`s:

```html
<label>
  Name
  <input type="text" name="username">
</label>
```
