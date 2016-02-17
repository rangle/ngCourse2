export function exampleRoot() {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {},
    controller: ExampleRoot,
    controllerAs: 'exampleRoot',
    template: `
    <div>
      <a2-downgrade></a2-downgrade>
      <hr />
      <a2-using-a1></a2-using-a1>
      <hr />
      <a1-using-a2-service></a1-using-a2-service>
      <hr />
      <a2-using-a1-service></a2-using-a1-service>
      <hr />
      <a2-projection>
        <a1-projection-content></a1-projection-content>
      </a2-projection>
      <hr />
      <a1-transclude>
        <a2-transclusion-contents></a2-transclusion-contents>
      </a1-transclude>
    </div>
    `
  };
}

class ExampleRoot {
  constructor() {

  }
}
