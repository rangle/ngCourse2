export function a1ProjectionContentsDirective() {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {},
    controller: A1ProjectionContents,
    controllerAs: 'a1ProjectionContents',
    template: `<p>{{ a1ProjectionContents.message }}</p>`
  };
}

class A1ProjectionContents {
  message = 'I am an Angular 1 Directive "projected" into Angular 2';
}
