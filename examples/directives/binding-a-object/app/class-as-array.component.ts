import {Component} from '@angular/core';

@Component({
  selector: 'class-as-array',
  template: `
    <p [ngClass]="['warning', 'big']">
      <ng-content></ng-content>
    </p>
  `,
  styles: [`
    .warning {
      color: red;
      font-weight: bold;
    }
    
    .big {
      font-size: 1.2rem;
    }
  `]
})
export class ClassAsArrayComponent {
}