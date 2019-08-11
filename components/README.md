# Components in Angular

![components](../.gitbook/assets/components.jpg)

The core concept of any Angular application is the _component_. In effect, the whole application can be modeled as a tree of these components.

This is how the Angular team defines a component:

> A component controls a patch of screen called a view.

Basically, a component is anything that is visible to the end user and which can be reused many times within an application.

In Angular 1.x we had router views and directives which worked sort of like components. The idea of directive components became quite popular. They were created by using `directive` with a controller while relying on the `controllerAs` and `bindToController` properties. For example:

```javascript
angular.module('ngcourse')
  .directive('ngcHelloComponent', () => ({
      restrict: 'E',
      scope: { name: '=' },
      template: '<span>Hello, {{ ctrl.name }}.</span>',
      controller: MyComponentCtrl,
      controllerAs: 'ctrl',
      bindToController: true
    })
  );
```

In fact, this concept became so popular that in Angular 1.5 the `.component` method was introduced as syntactic sugar.

```javascript
angular.module('ngcourse')
  .component('ngcHelloComponent', {
    bindings: { name: '=' },
    template: '<span>Hello, {{ $ctrl.name }}.</span>',
    controller: MyComponentCtrl
  });
```
