import { Component, Input, Output, EventEmitter } from 'angular2/core';

@Component({
  selector: 'rangle-text-field',
  template: `
    <input class="rangle-text-field"
      [placeholder]="placeholder"
      #field (keyup)="handleKeyup(field.value)">
  `,
  styles: [ `
    .rangle-text-field {
      border-radius: 3px;
      border: 1px solid #ccc;
      box-sizing: border-box;
      display: inline-block;
      font-size: inherit;
      font-weight: inherit;
      height: 2.5rem;
      padding: .5rem;
    }
  `]
})
export class RangleTextField {
  @Input() private placeholder: string;
  @Input() private value: String;
  @Output() private valueChange = new EventEmitter<String>();

  handleKeyup(fieldValue: string): void {
    this.valueChange.emit(fieldValue);
  }
}
