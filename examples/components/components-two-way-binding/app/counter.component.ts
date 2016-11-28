import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rio-counter',
  templateUrl: 'app/counter.component.html'
})
export class CounterComponent {
  @Input() count: number;
  @Output() countChange: EventEmitter<number>;

  constructor() {
    this.count = 0;
    this.countChange = new EventEmitter<number>();
  }

  increment() {
    this.count++;
    this.countChange.emit(this.count);
  }
}
