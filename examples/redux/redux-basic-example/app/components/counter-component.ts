import {Component, View, Input} from 'angular2/core';
@Component({
  selector: 'counter',
})
@View({
  template: `
  <p>
    Clicked: {{ counter }} times
    <button (click)="increment()">+</button>
    <button (click)="decrement()">-</button>
    <button (click)="incrementIfOdd()">Increment if odd</button>
    <button (click)="incrementAsync()">Increment async</button>
  </p>
  `
})
export class Counter {
  @Input() counter: number;
  @Input() increment: Function;
  @Input() decrement: Function;
  @Input() incrementIfOdd: Function;
  @Input() incrementAsync: Function;
}