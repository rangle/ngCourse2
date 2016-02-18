import {Component, EventEmitter} from 'angular2/core';

@Component({
  selector: 'ngc-radio',
  template: `
<div class="flex center">
  <a href="#!"
    class="flex-auto btn btn-primary"
    *ngFor="#button of buttons; #last = last; #i = index;"
    [ngClass]="{
      'bg-navy': button.value === selected,
      'rounded-left': i == 0,
      'border-left': i != 0,
      'not-rounded': i != 0 && !last,
      'rounded-right': last
    }"
    (click)="select(button.value)">
    {{ button.title }}
  </a>
</div>
`,
  inputs: ['buttons', 'selected'],
  outputs: ['onUpdate']
})
export default class Radio {
  buttons: Array<any>;
  selected: string;
  onUpdate: EventEmitter = new EventEmitter();

  select(value) {
    this.onUpdate.emit(value);
  }
}
