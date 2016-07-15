import {Component, Input} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
@Component({
  directives: [ROUTER_DIRECTIVES]
  selector: 'company-list',
  template: `
  <ul>
    <li *ngFor="let company of companies">
      <a [routerLink]="[company]">
        {{company}}
      </a>
    </li>
  </ul>

  `})
export default class CompanyList {
  @Input() companies:any;
  constructor() {

  }
}
