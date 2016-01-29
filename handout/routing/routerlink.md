# RouterLink #

After declaring routes and adding the outlet we need to tell Angular how to navigate between the routes. We can do it in two different ways if we like. One is using plain old href links in the templates as shown below.

```html
<nav>
    <a href="/componentOne">Component One</a>
    <a href="/componentTwo">Component Two</a>
</nav>
```

While this does work, it is not always recomended - as if you change your `@RouteConfig` definition, you will need to manually update all of your templates to reflect the new URL. There is also an issue where this can result in a full-page reload, which is usually something we do not wan't in our single page applications.

The preferred way is to define them using the RouterLink. The `RouterLink` directive lets you link to specific parts of your app. The values in the array will map to the `name` or `as` that was given to the component in the `@RouteConfig`. Example of defining route using RouterLink is shown below.

```html
<ul>
	  <li><a [routerLink]="['/ComponentOne']">Component One</a></li>
	  <li><a [routerLink]="['/ComponentTwo']">Component Two</a></li>
</ul>
```

If we want to define routes with parameters we need to pass the specific parameter value after each route in the `routerLink` array as shown below.

```html
<ul>
	  <li><a [routerLink]="['/ComponentOne']">Component One</a></li>
	  <li><a [routerLink]="['/ComponentTwo']">Component Two</a></li>
	  <li><a [routerLink]="['/ComponentThree',{message: 'Hello World'}]">Component Three with Param</a></li>
</ul>
```
[View Example](http://plnkr.co/edit/6T8sgG9eRfHmMdofWTGy?p=preview)

We will cover accessing the `RouteParams` in your component later in the [RouteParams](#routeparams) section.

Routes should be prepended with `/`, `./`, or `../`.  How you prefix the routes will impact how and where Angular 2 looks to find the component and routing information.

| Prefix | Looks in 
|--------|---
| `/`    | Root of the application
| `./`   | Current component children routes 
| `../`  | Current component parent routes


[View Example](http://plnkr.co/edit/lAJvRhGHwu0D6H5OGkhc?p=preview)

