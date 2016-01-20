import {Component} from 'angular2/core';

@Component({
  selector: 'ngc-card-actions',
  template: `
    <div class="border-top blue flex flex-auto py1">
      <div class="flex-auto"></div>
      <ng-content></ng-content>
    </div>
  `
})
export default class CardActions {
}
