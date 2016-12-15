import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <button type="button" (click)="toggleExists()">Toggle Component</button>
    <hr>
    <app-if-example *ngIf="exists">
      Hello
    </app-if-example>
  `
})
export class AppComponent {
  exists = true;
  
  toggleExists() {
    this.exists = !this.exists;
  }
}