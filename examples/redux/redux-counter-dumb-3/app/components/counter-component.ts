import {Component} from '@angular/core';

@Component({
  selector: 'counter',
  properties: [`counter`, `increment`, `decrement`,`incrementIfOdd`,`incrementAsync`],
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
 
}