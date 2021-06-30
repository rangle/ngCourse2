# Using Webpack

Using a module loader like webpack is essential for migrating to Angular, and should already be part of every modern programmer's tool set. Webpack will make it easy to manage all the different files that a modern, modular Angular project prescribes. This includes bundling the application for distribution or deployment.

Using webpack will also simplify a programmer's Angular workflow, since the easiest way to work with Angular is with TypeScript. It enables great tooling and allows modern syntax and operators to be transpiled to ES5 or even ES3 to work in older browsers.

Angular CLI under-the-hood already utilizes webpack to handle many of its internal build processes, and many times this is more than enough to get by for a project. Additionally, much of that functionality is now exposed in the angular.json file that allows you to configure your Angular application. Additionally, Angular somewhat discourages you from taking the wheel, so to speak. Angular is an opinionated framework, and this is an example of when those opinions may feel somewhat grating.

That being said, _sometimes_ you still want to have access to Webpack, and while it isn't always recommended, you can actually find a way to use both Angular CLI and a custom webpack configuration.

The most popular solution is usually the [custom-webpack](https://www.npmjs.com/package/@angular-builders/custom-webpack) community tool!
