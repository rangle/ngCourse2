import {Component} from 'angular2/core';

@Component({
	selector: 'counter',
	template: `
	<div>
	  <p>Count: {{num}}</p>
	  <button (click)="increment()">Increment</button>
	</div>
	`
})
export class Counter {
  num: number = 0;
  
  increment() {
    this.num++;
  }
}