import {Component, Input} from '@angular/core';

@Component({
  selector: 'door',
  template: `
    <div class="door">
      <h1 *ngIf="id != undefined">Door {{id}}</h1>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      border-bottom: 1px solid #6d4c41;
      margin-bottom: 2rem;
      display: block;
    }
    
    :host.closed .door {
      background-color: #795548; 
    }
    
    .door {
      width: 14rem;
      height: 20rem;
      margin: 0 auto;
      padding: 1rem;
      text-align: center;
      border: 1px solid #6d4c41;
    }
  `]
})
export class DoorComponent {
  @Input() id: number;
  
  ngOnInit() {
    if(this.id !== undefined) {
      console.log('opening door', this.id);
    } else {
      console.log('closing all doors');
    }
  }
}