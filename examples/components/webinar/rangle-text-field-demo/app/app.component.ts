import { Component } from 'angular2/core';
import { RangleTextField }  from './rangle-text-field';

@Component({
  selector: 'app',
  directives: [ RangleTextField ],
  template: `
    <rangle-text-field
      placeholder="This is a text field"
      [(value)]="displayValue">
    </rangle-text-field>
    <p>Input value: {{ displayValue }}</p>
  `
})
export class App {
  private displayValue: string;
}