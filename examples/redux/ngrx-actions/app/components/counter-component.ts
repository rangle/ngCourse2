import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'counter',
  template: `
  <p>
    Clicked: {{ counter | async }} times
    <button (click)="increment.emit()">+</button>
    <button (click)="decrement.emit()">-</button>
    <button (click)="incrementIfOdd.emit()">Increment if odd</button>
    <button (click)="incrementAsync.emit()">Increment async</button>
  </p>
  `
})
export class Counter {
  @Input() counter: Observable<number>;
  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();
  @Output() incrementIfOdd = new EventEmitter<void>();
  @Output() incrementAsync = new EventEmitter<void>();
}
