import {Component, Inject} from  'angular2/core';
import {A1UpgradeService} from '../services/a1-upgrade-service';

@Component({
  selector: 'a2-using-a1-service',
  template: `<p>{{ message }}</p>`
})
export class A2UsingA1Service {
  message = '';
  constructor(@Inject('a1UpgradeService') a1UpgradeService:A1UpgradeService) {
    this.message = a1UpgradeService.data;
  }
}