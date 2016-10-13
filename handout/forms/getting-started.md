# Getting Started


### Opt-In APIs
Before we dive into any of the form features, we need to do a little bit of housekeeping.
We need to bootstrap our application using the `FormsModule` and/or `ReactiveFormsModule`.

```js
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MyApp } from './components'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [MyApp],
  bootstrap: [MyApp]
})
export class MyAppModule {

}

platformBrowserDynamic().bootstrapModule(MyAppModule)  
```

### Input Labeling

Most of the form examples use the following HTML5 style for labeling inputs:

```html
<label for="name">Name</label>
<input type="text" name="username" id="name">
```

Angular 2 also supports the alternate HTML5 style, which precludes the necessity of `id`s on `<input>`s:

```html
<label>
  Name
  <input type="text" name="username">
</label>
```
