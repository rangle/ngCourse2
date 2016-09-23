import {Component} from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <button type="button" (click)="toggleExists()">Toggle Component</button>
    <hr/>
    <if-example *ngIf="exists">
      Hello
    </if-example>
  `
})
export class AppComponent {
  exists: boolean = true;
  
  toggleExists() {
    this.exists = !this.exists;
  }
}