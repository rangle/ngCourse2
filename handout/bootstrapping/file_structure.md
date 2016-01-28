# File structure

To get started lets create a barebones Angular 2 application with a single Component. To do this we'll need the following files:

- *app/app.component.ts*
- *app/boot.ts*
- *index.html*

*app.component.ts* is where we define our root Component, *index.html* is the page in which this Component will be rendered in, and *boot.ts* is the glue that combines the Component and page together.  

*index.html*

```js
...
<body>
	<my-app>Loading...</my-app>
</body>
...
```

*app/app.component.ts*

```js
import {Component} from 'angular2/core'

@Component({
	selector: 'my-app',
	template: '<b>Bootstrapping an Angular 2 Application</b>'
})

export class MyApp {}
```
*app/boot.ts*

```js
import {bootstrap} from 'angular2/platform/browser'
import {MyApp} from './app.component'

bootstrap(MyApp);
```
[View Example](http://plnkr.co/edit/VmS9belVWf8pVDh0jIlb)

This is the main entry point of the application, the `MyApp` operates as the root Component of our entire application and will be rendered on any `my-app` HTML element encountered. There is a `my-app` HTML element in the *index.html* file, and we use *app/boot.ts* to import the `MyApp` Component and the `bootstrap` function and kickstart the bootstrapping process, which will read the `MyApp` metadata and then load the application wherever the `my-app` selector/tag-name is found. 

Calling `bootstrap` will return a `Promise` that you can use to determine when the bootstrapping routine has completed. This is useful if you want to incorporate an initial UI loading state into you application. 

Why does Angular 2 bootstrap itself in this way? Well there is actually a very good reason. Since Angular 2 is not a web only based framework, we can write Components that will run in NativeScript, or Cordova, or any other environment that can host Angular 2 applications. The magic is then in our bootstrapping process - we can import which `bootstrap` routine we would like to use, depending on the environment we're operating under. In our example, since we were running our Angular 2 application in the browser, we used the bootstrapping process found in `angular2/platform/browser`. 


It also a good idea to leave the bootstrapping process in its own separate *boot.ts* file, this makes it easier to test (since the Components are isolated from the `bootstrap` call), easier to reuse, and gives better organization and structure to our application. 