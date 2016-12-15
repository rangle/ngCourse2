import { Component } from '@angular/core';

@Component({
  selector: 'app-style-example',
  template: `
    <p  style="padding: 1rem"
        [ngStyle]="{ 
          color: 'red',
          'font-weight': 'bold',
          borderBottom: borderStyle
        }">
        <ng-content></ng-content>
    </p>
  `
})
export class StyleExampleComponent {
  borderStyle = '1px solid black';
}
