# Understanding the File Structure

To get started let's create a bare-bones Angular 2 application with a single component. To do this we need the following files:

- *app/app.component.ts* - this is where we define our root component
- *app/app.module.ts* - the entry Angular Module to be bootstrapped
- *index.html* - this is the page the component will be rendered in
- *app/index.ts* - is the glue that combines the component and page together

*app/app.component.ts*

```js
import {Component} from '@angular/core'

@Component({
	selector: 'app',
	template: '<b>Bootstrapping an Angular 2 Application</b>'
})

export class MyApp {}
```
*index.html*

```js
...
<body>
	<app>Loading...</app>
</body>
...
```

*app/app.module.ts*
```js
import { BrowserModule }  from '@angular/platform-browser';
import { NgModule } '@angular/core';
import { MyApp } from './app.component'

@NgModule({
  imports: [BrowserModule],
  declarations: [MyApp],
  bootstrap: [MyApp]
})
export class MyAppModule {

}
```

*app/index.ts*

```js
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { MyAppModule } from './app.module'

platformBrowserDynamic().bootstrapModule(MyAppModule)
```

[View Example](https://plnkr.co/edit/XMpxd6?p=preview)

This is the main entry point of the application. The `MyAppModule`  operates as the root module of our  application. The module is configured to use `MyApp` as the component to bootstrap, and will be rendered on any `app` HTML element encountered.

There is an `app` HTML element in the *index.html* file, and we use *app/index.ts* to import the `MyAppModule` component and the `platformBrowserDynamic().bootstrapModule` function and kickstart the  process.

Why does Angular 2 bootstrap itself in this way? Well there is actually a very good reason. Since Angular 2 is not a web-only based framework, we can write components that will run in NativeScript, or Cordova, or any other environment that can host Angular 2 applications.

The magic is then in our bootstrapping process - we can import which platform we would like to use, depending on the environment we're operating under. In our example, since we were running our Angular 2 application in the browser, we used the bootstrapping process found in `@angular/platform-browser-dynamic`.

It's also a good idea to leave the bootstrapping process in its own separate *index.ts* file. This makes it easier to test (since the components are isolated from the `bootstrap` call), easier to reuse and gives better organization and structure to our application.

There is more to understanding Angular Modules and `@NgModule` which will be covered later, but for now this is enough to get started.
