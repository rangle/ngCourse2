import { Input, Component, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-alert',
	template: `
	  <div *ngIf="!hidden">
  	  <div class="backdrop" (click)="hide()"></div>
	    <div class="modal">
	      <ng-content></ng-content>
	      <div>
  	      <button (click)="hide()">{{ ok }}</button>
	      </div>
      </div>
	  </div>
  `,
  styles: [`
    .modal {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      border: 1px solid #ddd;
      padding: 1rem;
    }

    .backdrop {
      position: absolute;
      background: rgba(0, 0, 0, 0.1);
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
    }
  `]
})
export class AlertComponent {
  hidden = true;
  
  @Input() ok = 'OK';
  @Output() close = new EventEmitter<boolean>();

  constructor() {}
  
  show() {
    this.hidden = false;
  }
  
  hide() {
    this.hidden = true;
    this.close.emit(true);
  }
}
