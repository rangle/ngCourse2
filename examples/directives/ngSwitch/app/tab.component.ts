import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  template: `
    <div class="wrapper unselectable" [ngClass]="{ active: active }">
      <ng-content></ng-content>
      
    </div>
  `,
  styles: [`
    :host {
      cursor: pointer;
      user-select: none;
    }

    .wrapper {
      padding: 1rem;
      background-color: #ddd;
    }

    .active {
      background-color: #bbb;
    }
    
    .unselectable {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
  `]
})
export class TabComponent {
  @Input() active: boolean = false;
}