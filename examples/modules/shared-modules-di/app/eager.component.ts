import { Component } from '@angular/core';
import { CounterService } from './shared/counter.service';

@Component({
  selector: 'app-eager',
  template: `
    <p>Eager Component</p>
    <button (click)="increaseCounter()">Increase Counter</button>
    <p>Counter: {{ counterService.counter }}</p>
  `
})
export class EagerComponent {
  constructor(public counterService: CounterService) {}

  increaseCounter() {
    this.counterService.counter += 1;
  }
}