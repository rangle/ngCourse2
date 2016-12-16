import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div *ngFor="let item of [1,2,3,4,5,6]">
      <app-card *appDelay="500 * item">
        {{item}}
      </app-card>
    </div>
  `
})
export class AppComponent {
}