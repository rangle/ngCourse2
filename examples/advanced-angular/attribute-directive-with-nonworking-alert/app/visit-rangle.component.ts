import {Component} from '@angular/core';

@Component({
  selector: 'visit-rangle',
  template: `
    <button type="button" (click)="visitRangle()" confirm>Visit Rangle</button>
  `
})
export class VisitRangleComponent {
  visitRangle() {
    console.log('Visiting rangle');
    location.href = 'https://rangle.io';
  }
}