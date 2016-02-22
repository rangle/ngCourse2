import {Component, EventEmitter} from 'angular2/core';

@Component({
  selector: 'ngc-radio',
  template: `
<div class="flex center">
  <a href="#!"
    class="flex-auto btn btn-primary rounded-left">
    Option
  </a>
  <a href="#!"
    class="flex-auto btn btn-primary not-rounded border-left">
    Option
  </a>
  <a href="#!"
    class="flex-auto btn btn-primary rounded-right border-left">
    Option
  </a>
</div>
`
})
export default class Radio {
}
