# Defining Links Between Routes #

## RouterLink ##

Add links to routes using the `RouterLink` directive.

For example the following code defines a link to the route at path `component-one`.

```html
<a [routerLink]="['/component-one']">Component One</a>
```

## Navigating Programmatically ##

Alternatively, you can navigate to a route by calling the `navigate` function on the router:

```javascript
this.router.navigate(['/component-one']);
```
