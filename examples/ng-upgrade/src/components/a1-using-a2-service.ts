import {A2DowngradeService} from '../services/a2-downgrade-service';

export function a1UsingA2ServiceDirective() {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {},
    controller: A1UsingA2,
    controllerAs: 'a1UsingA2',
    template: `<span>{{ a1UsingA2.message }}</span>`
  };
}

class A1UsingA2 {
  message: string;
  constructor(private a2DowngradeService: A2DowngradeService) {
    this.message = this.a2DowngradeService.fetchData();
  }
}
