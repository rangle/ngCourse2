export function a1TransclusionDirective() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    bindToController: {},
    controller: A1Transclusion,
    controllerAs: 'a1ProjectionContents',
    template: `
    <p>
      <ng-transclude></ng-transclude>
    </p>
    `
  };
}

class A1Transclusion {
}
