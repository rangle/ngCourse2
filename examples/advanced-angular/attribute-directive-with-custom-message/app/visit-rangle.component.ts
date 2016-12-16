import { Component } from '@angular/core';

@Component({
  selector: 'app-visit-rangle',
  template: `
    <button 
      type="button" 
      [appConfirm]="visitRangle" 
      confirmMessage="Click ok to visit Rangle.io!">
      Visit Rangle
    </button>
  `
})
export class VisitRangleComponent {
  visitRangle() {
    console.log('Visiting rangle');
    location.href = 'https://rangle.io';
  }
}