import {
  Component,
  OnChanges, 
  SimpleChange,
  OnInit,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  EventEmitter
} from '@angular/core';

@Component({
	selector: 'child',
	inputs: ['name'],
	outputs: ['log'],
	template: `
	  <div style="border: 2px solid blue; padding: 0.5rem 1rem; margin-top: 4rem;">
	    <h4>Child Component</h4>
	    <p>{{ name }}</p>
    </div>
	`
})
class Child {
  
  log: EventEmitter = new EventEmitter();
  _verb: string = 'set';
  _onChangesCounter: number = 0;
  
  // Only called if there is an [input] variable set by parent.
  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
    let changesMsgs:string[] = []
    for (let propName in changes) {
      if (propName === 'name') {
        let name = changes['name'].currentValue;
        changesMsgs.push(`name ${this._verb} to "${name}"`);
      } else {
        changesMsgs.push(propName + ' ' + this._verb);
      }
    }
    this.log.emit(`onChanges (${this._onChangesCounter++}): ${changesMsgs.join('; ')}`);
    this._verb = 'changed';
  }

  ngOnInit() {
    this.log.emit(`onInit`);
  }

  ngAfterContentInit(){
    this.log.emit(`afterContentInit`);
  }

  // Called after every change detection check
  // of the component (directive) CONTENT
  // Beware! Called frequently!
  ngAfterContentChecked(){
    // this._logIt('afterContentChecked');
  }

  ngAfterViewInit(){
    this.log.emit(`afterViewInit`);
  }

  // Called after every change detection check
  // of the component (directive) VIEW
  // Beware! Called frequently!
  ngAfterViewChecked(){
    // this.log.emit(`afterViewChecked`);
  }

  ngOnDestroy() {
    this.log.emit(`onDestroy`);
  }
  
}


@Component({
	selector: 'app',
	template: `
	  <h5>Lifecycle Events Log</h5>
	  {{ logs }}
	  <ul>
	    <li *ngFor="let log of logs">
	      <code>{{ log }}</code>
	    </li>
	  </ul>
	  <child *ngIf="showChild" [name]="name" (log)="onLog($event)"></child>
	`,
	directives: [Child]
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

