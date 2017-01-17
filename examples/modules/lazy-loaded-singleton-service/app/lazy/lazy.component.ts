import { Component } from '@angular/core';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-lazy',
  template: `
    <p>Lazy Component</p>
    <button (click)="increaseCounter()">Increase Counter</button>
    <p>Counter: {{ counterService.counter }}</p>
  `
})
export class LazyComponent {
  constructor(public counterService: CounterService) {}

  increaseCounter() {
    this.counterService.counter += 1;
  }
}