import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AlertComponent } from './alert.component';

@Component({
	selector: 'app-root',
	template: `
    <app-alert #first ok="Next" (close)="showAlert(2)">
      Step 1: Learn angular
    </app-alert>
    <app-alert ok="Next" (close)="showAlert(3)">
      Step 2: Love angular
    </app-alert>
    <app-alert ok="Close">
      Step 3: Build app
    </app-alert>
	  <button (click)="showAlert(1)">Show steps</button>`
})
export class AppComponent {
  @ViewChild('first') alert: AlertComponent;
  @ViewChildren(AlertComponent) alerts: QueryList<AlertComponent>;
  alertsArr = [];

  ngAfterViewInit() {
    this.alertsArr = this.alerts.toArray();
  }
  
  showAlert(step) {
    this.alertsArr[step - 1].show(); // step 1 is alert index 0
  }
}
