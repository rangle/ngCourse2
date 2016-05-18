import {Component} from '@angular/core';

@Component({
  selector: 'ngc-card-title',
  template: `
    <h5 class="gray caps m0 py2">
      <ng-content></ng-content>
    </h5>
  `
})
export default class CardTitle {
}
