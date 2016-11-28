import { Component } from '@angular/core';

@Component({
  selector: 'rio-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent {
  helloName: string;

  constructor() {
    this.helloName = 'Other World';
  }
}
