import { Component } from '@angular/core';

@Component({
	selector: 'app',
	template: `
	  <h5>Lifecycle Events Log</h5>
	  {{ logs.join(', ') }}
	  <ul>
	    <li *ngFor="let log of logs">
	      <code>{{ log }}</code>
	    </li>
	  </ul>
	  <child *ngIf="showChild" [name]="name" (log)="onLog($event)"></child>
	`
})
export class App {
  name: string;
  logs: string[] = [];
  showChild: boolean = true;

  constructor() {
    this.name = 'Alice';
    setTimeout(() => this.updateName(), 3000);
    setTimeout(() => this.hideChild(), 4000);
  }

  updateName() {
    this.name = 'Bob';
  }

  hideChild() {
    this.showChild = false;
    this.logs.push(`onDestroy`);
  }

  onLog(data) {
    this.logs.push(data);
  }

}
