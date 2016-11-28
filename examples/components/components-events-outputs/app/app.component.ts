import { Component, OnChange } from '@angular/core';

@Component({
  selector: 'rio-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent implements OnChange {
  num: number;
  parentCount: number;

  constructor() {
    this.num = 0;
    this.parentCount = 0;
  }

  ngOnChange(val: any) {
    this.parentCount = val;
  }
}
