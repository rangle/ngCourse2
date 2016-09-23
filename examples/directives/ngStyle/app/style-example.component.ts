import {Component} from '@angular/core';

@Component({
  selector: 'style-example',
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
  borderStyle: string = '1px solid black';
}
