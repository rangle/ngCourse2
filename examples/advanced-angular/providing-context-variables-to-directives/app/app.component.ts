import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div *ngFor="let item of [1,2,3,4,5,6]">
      <app-card *appDelay="500 * item; let loaded = loadTime">
        <div class="main">{{item}}</div>
        <div class="sub">{{loaded | number:'1.4-4'}}</div>
      </app-card>
    </div>
  `
})
export class AppComponent {
}