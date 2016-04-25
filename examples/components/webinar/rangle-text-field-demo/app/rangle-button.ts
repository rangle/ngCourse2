import { Component, Input, Output, EventEmitter } from 'angular2/core'

@Component({
  selector: 'rangle-button',
  template: `
    <button
      [ngClass]="dynamicStyles()"
      class="rangle-button"
      (click)="onClick.emit()">
      {{ name }}
    </button>
  `,
  styles: [ `
    .rangle-button {
      border: none;
      border-radius: 3px;
      color: white;
      font-weight: bold;
      letter-spacing: .2em;
      padding: 0.5rem;
      text-transform: uppercase;
    }
    .primary {
      background: #E5373A;
    }
    .normal {
      background: #422D3F;
    }
  `]
})
export class RangleButton {
  @Input() name: string;
  @Input() isPrimary: boolean;
  @Output() onClick = new EventEmitter();

  dynamicStyles() {
    return this.isPrimary ? 'primary' : 'normal';
  }
}
