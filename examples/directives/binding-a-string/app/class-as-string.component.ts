import {Component} from '@angular/core';

@Component({
  selector: 'class-as-string',
  template: `
    <p ngClass="centered-text underlined" class="orange">
      <ng-content></ng-content>
    </p>
  `,
  styles: [`
    .centered-text {
      text-align: center;
    }
    
    .underlined {
      border-bottom: 1px solid #ccc;
    }
    
    .orange {
      color: orange;
    }
  `]
})
export class ClassAsStringComponent {
  
}