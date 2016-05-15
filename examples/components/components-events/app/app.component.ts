import {Component} from '@angular/core';

@Component({
  selector: 'counter',
  template: `
  <div>
    <p>Count: {{num}}</p>
	  <button (click)="increment()">Increment</button>
  </div>
  `
})
export class App {
  num: number = 0;
  
  increment() {
    this.num++;
  }
}