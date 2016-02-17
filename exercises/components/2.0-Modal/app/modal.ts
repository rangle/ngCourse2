import {Component, EventEmitter} from 'angular2/core';

@Component({
  selector: 'ngc-modal',
  template: `
<div class="fixed top-0 right-0 bottom-0 left-0 bg-darken-4 flex flex-center">
  <div class="sm-col-12 md-col-8 lg-col-6 mx-auto overflow-hidden bg-white rounded">

    <div class="p2 flex">
      <h1 class="h2 m0 flex-auto">
        {{ title }}
      </h1>
      <button class="btn">
        ✖
      </button>
    </div>

    <div class="p2">
      <!-- All content goes here -->
    </div>

    <div class="p2 bg-blue aqua">
      <!-- All actions go here -->
    </div>
  </div>
</div>
`,
  inputs: [],
  outputs: []
})
export default class Modal {
  title: string;
}
