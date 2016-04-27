import { Component, Input } from 'angular2/core';

@Component({
  selector: 'rangle-label',
  template: '<label class="rangle-label">{{ name }}</label>',
  styles: [ `
    .rangle-label {
      color: #422D3F;
      display: block;
      font-weight: bold;
      letter-spacing: .2em;
      text-transform: uppercase;
    }
  `]
})
export class RangleLabel {
  @Input() private name: string;
}
