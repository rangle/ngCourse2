import {Component} from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <div>
      Parent Num: {{ num }}<br />
      Parent Count: {{ parentCount }}
	    <counter [count]="num" (result)="onChange($event)">
	    </counter>
	  </div>
  `
})
export class App {
  num: number;
  parentCount: number;

  constructor() {
    this.num = 0;
    this.parentCount = 0;
  }

  onChange(val: any) {
    this.parentCount = val;
  }
}
