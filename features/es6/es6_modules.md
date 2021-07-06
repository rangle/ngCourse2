# Modules

ES6 introduced _module_ support. A module in ES6 is single file that allows code and data to be isolated, it helps in organizing and grouping code logically. In other languages it's called a package or library.

All code and data inside the module has file scope, what this means is they are not accessible from code outside the module. To share code or data outside a module, it needs to be exported using the **export** keyword.

```javascript
// File: circle.js

export const pi = 3.141592;

export const circumference = diameter => diameter * pi;
```

The code above uses the _Arrow_ function for `circumference`. Read more about arrow functions [here](https://angular-2-training-book.rangle.io/handout/features/arrow_functions.html)

## Module Systems

Using a module on the backend\(server side\) is relatively straightforward, you simply make use of the **import** keyword. Additionally, modern browsers are now compatible with ES6's module import syntax, so our overhead is much lower than it used to be - where we used to need to use a Module Loading Tool.
We won't get into the various module systems out there, but it's worth understanding there are various module loaders available. The popular choices out there are:

* RequireJS
* SystemJS
* Webpack


