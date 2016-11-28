import { Component } from '@angular/core';

@Component({
  selector: 'rio-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent {
  number1: number;
  number2: number;
  number3: number;
  number4: number;

  constructor() {
    this.number1 = 0;
    this.number2 = 0;
    this.number3 = 0;
    this.number4 = 0;
  }

  onCountChanged(value: number) {
    this.number3 = value;
    this.number4 = value;
  }
}
