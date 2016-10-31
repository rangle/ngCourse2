# ECMAScript 2015 Modules


ECMAScript 2015 introduced _module_ support. A module in ECMAScript 2015 is single file that allows code and data to be isolated, it helps in organizing and grouping code logically. In other languages it's called a package or library.

All code and data inside the module has file scope, what this means is they are not accessible from code outside the module. To share code or data outside a module, it needs to be exported using the **export** keyword.

```js
// File: circle.js

export const pi = 3.141592;

export const circumference = diameter => diameter * pi;
```

The code above uses the _Arrow_ function for `circumference`, which was introduced in ECMAScript 2016, and is a shortform for the following.

```js
export function circumference(diameter) {
  return diameter * pi;
}
```

## Module Systems

Using a module on the backend(server side) is relatively straightforward, you simply make use of the **import** keyword. However Web Browsers have no concept of modules or import, they just know how to load javascript code. We need a way to bring in a javascript module to start using it from other javascript code. This is where a module loader comes in.

We won't get into the various module systems out there, but it's worth understanding there are various module loaders available. The popular choices out there are:

* RequireJS
* SystemJS
* Webpack

## Loading a Module From a Browser

Below we make use of SystemJS to load a module. The script first loads the code for the SystemJS library, then the function call **System.import** is use to import(load) the _app_ module.

```html
  <script src="/node_module/systemjs/dist/system.js"></script>
  <script>
    var promise = System.import('app')
      .then(function() {
        console.log('Loaded!');
      })
      .then(null, function(error) {
        console.error('Failed to load:', error);
      });
  </script>
```

