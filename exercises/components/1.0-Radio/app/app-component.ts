import {Component} from '@angular/core';
import Radio from './radio';

@Component({
  selector: 'ngc-app',
  template: `<div class="p3">
    <ngc-radio>
    </ngc-radio>
  </div>`
})
export default class App {
  buttons: Array<any> = [];
}
