# Part 4: Components in Angular 2

![components](../../img/components.jpg)

The core concept of any Angular 2 application is the *component*. In effect, the whole application can be modeled as a tree of these components.

This is how the Angular 2 team defines a component:

> A Component controls a patch of screen real estate that we could call a view, and declares reusable UI building blocks for an application.

Basically, a component is anything that is visible to the end user and which can be reused many times within an application.

In Angular 1.x we had router views and directives which worked sort of like components. The idea of directive components became quite popular. They were created by using `directive` with a controller while relying on the `controllerAs` and `bindToController` properties. For example:

```js
angular.module('ngcourse')
  .directive('ngcHelloComponent', () => ({
      restrict: 'E',
      replace: true,
      scope: { name: '=' },
      template: '<span>Hello, {{ ctrl.name }}.</span>',
      controller: MyComponentCtrl,
      controllerAs: 'ctrl',
      bindToController: true
    })
  );
```

In fact, this concept became so popular that in Angular 1.5 the `.component` method was introduced as syntactic sugar.

```js
angular.module('ngcourse')
  .component('ngcHelloComponent', {
    bindings: { name: '=' },
    template: '<span>Hello, {{ $ctrl.name }}.</span>',
    controller: MyComponentCtrl
  });
```
