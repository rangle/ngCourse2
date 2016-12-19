import { Component, ViewChild } from '@angular/core';
import { AlertComponent } from './alert.component';

@Component({
	selector: 'app-root',
	template: `
    <app-alert>My alert</app-alert>
	  <button (click)="showAlert()">Show Alert</button>`
})
export class AppComponent {
  @ViewChild(AlertComponent) alert: AlertComponent;

  showAlert() {
    this.alert.show();
  }
}
