import {Component, Input} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
@Component({
  directives: [ROUTER_DIRECTIVES]
  selector: 'company-list',
  template: `
  <ul>
    <li *ngFor="#company of companies">
    <!-- 
    use the routerLink directive so that when
    clicking on a company name, it will route to the
    component that lists the users for the company.
    -->
        {{company}}
    
    </li>
  </ul>
  
  `})
export default class CompanyList { 
  @Input() companies:any;
  constructor() {
    
  }  
}