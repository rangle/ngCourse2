# Defining Links Between Routes #

## RouterLink ##

Links to routes can be added using the `RouterLink` directive, which is part of `ROUTER_DIRECTIVES` along with `RouterOutlet`.

For example the following code defines a link to the route at path `component-one`.

```html
<a [routerLink]="['/component-one']">Component One</a>
```

## Navigating Programmatically ##

Routes can be navigated to by calling the `navigate` function on the router as well:

```javascript
this.router.navigate(['/component-one']);
```