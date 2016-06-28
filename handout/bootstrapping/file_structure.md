# File Structure

To get started let's create a bare-bones Angular 2 application with a single component. To do this we'll need the following files:

- *app/app.component.ts* - this is where we define our root component
- *index.html* - this is the page the component will be rendered in
- *app/boot.ts* - is the glue that combines the component and page together

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

*app/boot.ts*

```js
import {bootstrap} from '@angular/platform/browser'
import {MyApp} from './app.component'

bootstrap(MyApp);
```

[View Example](https://plnkr.co/edit/RVzLRp3rt4LgQfGSHIsx?p=preview)

This is the main entry point of the application: the `App` component operates as the root component of our entire application and will be rendered on any `app` HTML element encountered. There is an `app` HTML element in the *index.html* file, and we use *app/boot.ts* to import the `MyApp` component and the `bootstrap` function and kickstart the bootstrapping process, which will read the `App` metadata and then load the application wherever the `app` selector/tag-name is found.

Calling `bootstrap` will return a `Promise` that you can use to determine when the bootstrapping routine has completed. This is useful if you want to incorporate an initial UI loading state into your application.

Why does Angular 2 bootstrap itself in this way? Well there is actually a very good reason. Since Angular 2 is not a web-only based framework, we can write components that will run in NativeScript, or Cordova, or any other environment that can host Angular 2 applications. The magic is then in our bootstrapping process - we can import which `bootstrap` routine we would like to use, depending on the environment we're operating under. In our example, since we were running our Angular 2 application in the browser, we used the bootstrapping process found in `@angular/platform-browser-dynamic`.

It's also a good idea to leave the bootstrapping process in its own separate *boot.ts* file. This makes it easier to test (since the components are isolated from the `bootstrap` call), easier to reuse and gives better organization and structure to our application.
