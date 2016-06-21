# ES6 Modules

ES6 also introduces the concept of a module, which works similar to other languages. Defining an ES6 module is quite easy: each file is assumed to define a module and we specify its exported values using the `export` keyword. 

Loading ES6 modules is a little trickier. In an ES6-compliant browser you use the `System` keyword to load modules asynchronously. To make our code work with current browsers, however, we will use SystemJS library as a polyfill:

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
