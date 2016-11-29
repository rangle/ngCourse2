import { Component } from '@angular/core';

@Component({
  selector: 'rio-counter',
  template: `
    <div>
      <p>Count: {{num}}</p>
      <button (click)="increment()">Increment</button>
    </div>
  `
})
export class CounterComponent {
  num = 0;

  increment() {
    this.num++;
  }
}
