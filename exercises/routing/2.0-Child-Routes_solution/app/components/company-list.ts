import {Component, Input} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
@Component({
  directives: [ROUTER_DIRECTIVES]
  selector: 'company-list',
  template: `
  <ul>
    <li *ngFor="#company of companies">
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