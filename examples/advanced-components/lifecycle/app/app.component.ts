import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
	  <h5>Lifecycle Events Log</h5>
	  {{ logs.join(', ') }}
	  
	  <ul>
	    <li *ngFor="let log of logs">
	      <code>{{ log }}</code>
	    </li>
	  </ul>
	  
	  <app-child 
	    *ngIf="showChild" 
	    [name]="name"
	    (log)="onLog($event)">
	  </app-child>
	`
})
export class AppComponent implements OnInit {
  name = 'Alice';
  logs: string[] = [];
  showChild = true;
  
  ngOnInit() {
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
