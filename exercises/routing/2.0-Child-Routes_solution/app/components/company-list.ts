import {Component, Input} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
@Component({
  directives: [ROUTER_DIRECTIVES]
  selector: 'company-list',
  template: `
  <ul>
    <li *ngFor="let company of companies">
      <a [routerLink]="['./CompanyUsers',{companyName: company}]">
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
