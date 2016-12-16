import { Component, OnInit } from '@angular/core';
import { CounterService } from '../shared/counter.service';

@Component({
  selector: 'app-lazy',
  template: `
    <p>Lazy Component</p>
    <button (click)="increaseCounter()">Increase Counter</button>
    <p>Counter: {{ counterService.counter }}</p>
  `
})
export class LazyComponent implements OnInit {
  
  constructor(public counterService: CounterService) {}

  increaseCounter() {
    this.counterService.counter += 1;
  }
}