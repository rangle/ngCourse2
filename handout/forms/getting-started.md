# Getting Started


### Opt-In APIs
Before we dive into any of the form features, we need to do a little bit of housekeeping.
If you are using a RC5 or above of Angular 2, we need to bootstrap our application using the new `FormsModule` and/or `ReactiveForms` module.

```js
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MyApp } from './components'

@NgModule({
  imports: [BrowserModule,
    ReactiveFormsModule,
    FormsModule]
  declarations: [MyApp],
  bootstrap: [MyApp]
})
export class MyAppModule {

}

platformBrowserDynamic().bootstrapModule(MyAppModule)  

```


> This override will be deprecated in future releases.


### Input Labeling

Most of the form examples use the following HTML5 style for labeling inputs:

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
