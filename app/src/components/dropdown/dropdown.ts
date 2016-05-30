import {Component, ChangeDetectionStrategy} from '@angular/core';
import {List} from 'immutable';

@Component({
  selector: 'ngc-dropdown',
  inputs: [
    'items',
    'defaultValue',
    'selected',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <select [(ngModel)]="selected" class="field">
      <option 
       *ngIf="defaultValue" 
       [value]="defaultValue">
       {{ defaultValue }}
      </option>
      <option
       *ngFor="let item of items"
       [value]="item">
       {{ item }}
      </option>
    </select>
  `
})
export default class Dropdown {

  items: List<string>; 

}
