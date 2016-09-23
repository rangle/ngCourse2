import {Component} from '@angular/core';

@Component({
  selector: 'visit-rangle',
  template: `
    <button type="button" (click)="visitRangle()">Visit Rangle</button>
  `
})
export class VisitRangleComponent {
  visitRangle() {
    location.href = 'https://rangle.io';
  }
}