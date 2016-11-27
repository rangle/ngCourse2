import { Component } from '@angular/core';

@Component({
  selector: 'rio-app',
  template: '<p>Hello {{name}}</p>'
})
export class AppComponent {
  name: string;

  constructor() {
    this.name = 'World';
  }
}
