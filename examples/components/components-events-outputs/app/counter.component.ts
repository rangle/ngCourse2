import {Component, EventEmitter} from '@angular/core';

@Component({
  selector: 'counter',
  inputs: ['count'],
  outputs: ['result'],
  template: `
    <div>
      <p>Count: {{ count }}</p>
      <button (click)="increment()">Increment</button>
    </div>
  `
})
export class Counter {
  count: number = 0;
  result: EventEmitter = new EventEmitter();
  
  increment() {
    this.count++;
    this.result.emit(this.count);
  }
}