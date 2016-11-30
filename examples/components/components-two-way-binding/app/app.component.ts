import { Component } from '@angular/core';

@Component({
  selector: 'rio-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent {
  number1 = 0;
  number2 = 0;
  number3 = 0;
  number4 = 0;

  onCountChanged(value: number) {
    this.number3 = value;
    this.number4 = value;
  }
}
