import {Component, Input} from '@angular/core';

@Component({
	selector: 'app',
	template: `
    <div>
      <counter [(count)]="number1">Number 1:</counter>
	    <counter [count]="number2" (countChange)="number2=$event">Number 2:</counter>
	    <counter [count]="number3" (countChange)="onCountChanged($event)">Number 3:</counter>
      <ul>
      <li> number1: {{number1}} </li>
      <li> number2: {{number2}} </li>
      <li> number3: {{number3}} </li>
      <li> number4: {{number4}} </li>

      </ul>
	  </div>
	`
})
export class App {
  number1: number = 0;
  number2: number = 0;
  number3: number = 0;
  number4: number = 0;

  constructor() {
    this.num = 0;
  }

  onCountChanged(value: number) {
    this.number3 = value;
    this.number4 = value;
  }
}

