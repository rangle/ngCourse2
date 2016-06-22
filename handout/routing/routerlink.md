# RouterLink #

After declaring routes and adding the outlet, we must tell Angular how to navigate between the routes. There are two ways to do this. One way is to use href links in the templates as shown below.

```html
<nav>
    <a href="/componentOne">Component One</a>
    <a href="/componentTwo">Component Two</a>
</nav>
```

While this does work, it is not always recommended, because if you change your `@RouteConfig` definition you will have to manually update all of your templates to reflect the new URL. There is also an issue where this can result in a full-page reload, which is usually something we do not want in our single page applications.

The preferred way is to define them using the RouterLink. The `RouterLink` directive lets you link to specific parts of your app. The values in the array will map to the `name` or `as` that was given to the component in the `@RouteConfig`. 
The following example shows how to define routes using RouterLink:

```html
<ul>
	  <li><a [routerLink]="['/ComponentOne']">Component One</a></li>
	  <li><a [routerLink]="['/ComponentTwo']">Component Two</a></li>
</ul>
```

If we want to define routes with parameters, we must pass the specific parameter value after each route in the `routerLink` array as shown below:

```html
<ul>
	  <li><a [routerLink]="['/ComponentOne']">Component One</a></li>
	  <li><a [routerLink]="['/ComponentTwo']">Component Two</a></li>
	  <li><a [routerLink]="['/ComponentThree',{message: 'Hello World'}]">Component Three with Param</a></li>
</ul>
```
[View Example](https://plnkr.co/edit/kooqJGsKNQUgPbxYX1VC?p=preview)

We will cover accessing the `RouteParams` in your component later in the [RouteParams](./routeparams.md) section.

Routes should be prepended with `/`, `./`, or `../`; this tells Angular 2 where to look for the component and routing information.

| Prefix | Looks in
|--------|---
| `/`    | Root of the application
| `./`   | Current component children routes
| `../`  | Current component parent routes


[View Example](https://plnkr.co/edit/wfwe4ucFLSXEBWAMDRpG?p=preview)
