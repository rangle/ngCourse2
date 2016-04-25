import { Component, Input } from 'angular2/core';
import { RangleLabel } from './rangle-label';

@Component({
  selector: 'rangle-bar',
  directives: [ RangleLabel ],
  template: `
    <rangle-label [name]="name">
    </rangle-label>
    <div class="row">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      background: #F8F8F8;
      border: solid #ccc 1px;
      display: block;
      padding: 1rem;
      margin: 1rem;
    }
    .row {
      display: flex;
      margin-top: 0.5rem;
    }
  `]
})
export class RangleBar {
  @Input() name: string;
}
