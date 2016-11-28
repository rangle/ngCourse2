import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'rio-counter',
  templateUrl: 'app/counter.component.html'
})
export class CounterComponent {
  @Input()  count: number;
  @Output() result: EventEmitter;

  constructor() {
    this.count = 0;
    this.result = new EventEmitter();
  }

  increment() {
    this.count++;
    this.result.emit(this.count);
  }
}
