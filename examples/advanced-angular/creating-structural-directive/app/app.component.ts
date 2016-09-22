import {Component} from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <div *ngFor="let item of [1,2,3,4,5,6]">
      <card *delay="500 * item">
        {{item}}
      </card>
    </div>
  `
})
export class AppComponent {
}