import {Component, Inject, Input} from '@angular/core';
import {bindActionCreators} from 'redux';
import * as CounterActions from '../actions/counter-actions';
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