import {Component, EventEmitter} from 'angular2/core';

@Component({
  selector: 'ngc-modal',
  template: `
<div class="fixed top-0 right-0 bottom-0 left-0 bg-darken-4 flex flex-center"
  *ngIf="isVisible">
  <div class="sm-col-12 md-col-8 lg-col-6 mx-auto overflow-hidden bg-white rounded">

    <div class="p2 flex">
      <h1 class="h2 m0 flex-auto">
        {{ title }}
      </h1>
      <button class="btn"
        (click)="close()">
        ✖
      </button>
    </div>

    <div class="p2">
      <ng-content></ng-content>
    </div>

    <div class="p2 bg-blue aqua">
      <ng-content select="button"></ng-content>
    </div>
  </div>
</div>
`,
  inputs: ['isVisible', 'title'],
  outputs: ['isVisibleChange']
})
export default class Modal {
  isVisible: boolean;
  title: string;
  isVisibleChange: EventEmitter = new EventEmitter();

  close() {
    this.isVisibleChange.emit(false);
  }
}
