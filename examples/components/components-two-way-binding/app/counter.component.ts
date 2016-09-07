import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'counter',
  template: `
    <div>

      <p>
        <ng-content></ng-content>
        Count: {{ count }} -
        <button (click)="increment()">Increment</button>
      </p>

    </div>
  `
})
export class Counter {
  @Input() count: number = 0;
  @Output() countChange: EventEmitter<number> = new EventEmitter<number>();

  increment() {
    this.count++;
    this.countChange.emit(this.count);
  }
}
