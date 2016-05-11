# ES6 Modules

ES6 also introduces the concept of a module, which works in a similar way to other languages. Defining an ES6 module is quite easy: each file is assumed to define a module and we'll specify it's exported values using the `export` keyword. Loading ES6 modules is a little trickier.

In an ES6 compliant browser you would be using the `System` keyword to load modules asynchronously. To make our code work with the browsers of today, however, we will use SystemJS library as a polyfill:

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
