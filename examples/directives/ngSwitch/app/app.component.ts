import {Component} from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <div [ngSwitch]="door">
      <door [id]="1" *ngSwitchCase="1">A new car!</door>
      <door [id]="2" *ngSwitchCase="2">A washer and dryer!</door>
      <door [id]="3" *ngSwitchCase="3">A trip to Tahiti!</door>
      <door [id]="4" *ngSwitchCase="4">25 000 dollars!</door>
      <door *ngSwitchDefault class="closed"></door>
    </div>
    
    <div class="options">
      <h2>See what's behind each door</h2>
      <input type="radio" name="door" (click)="setDoor(1)" /> Door 1
      <input type="radio" name="door" (click)="setDoor(2)" /> Door 2
      <input type="radio" name="door" (click)="setDoor(3)" /> Door 3
      <input type="radio" checked="checked" name="door" (click)="setDoor()"/> Close all
    </div>
  `
})
export class AppComponent {
  door: number;
  
  setDoor(num: number) {
    this.door = num;
  }
}