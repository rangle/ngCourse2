import {Component, ChangeDetectionStrategy, Input} from 'angular2/core';
import {List} from 'immutable';

@Component({
  selector: 'ngc-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <select [(ngModel)]="selected" class="field">
      <option 
       *ngIf="defaultValue" 
       [value]="defaultValue">
       {{ defaultValue }}
      </option>
      <option
       *ngFor="#item of items"
       [value]="item">
       {{ item }}
      </option>
    </select>
  `
})
export default class Dropdown {

  @Input() items: List<string>;
  @Input() defaultValue;
  @Input() selected: any;

}
