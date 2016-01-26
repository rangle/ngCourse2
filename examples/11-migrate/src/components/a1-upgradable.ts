export function a1UpgradableDirective() {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {},
    controller: Upgradable,
    controllerAs: 'a1Upgradable',
    template: `<span>{{ a1Upgradable.message }}</span>`
  };
}

class Upgradable {
  message = 'I am an Angular 1 Directive';
}
