import {Component} from 'angular2/core';
import Users from '../services/users-service';

@Component({
  selector: 'company-list',
  template: `<ul>
  <li *ngFor="#company of companies">{{company}}</li>
  </ul>
  `,
  providers: [Users],
  
})
export default class CompanyList { 
  public companies:any;
  
  constructor(private _users: Users) {
    
  }  
  
  ngOnInit() {
   
    this.companies = this._users.getCompanyNames();
  }
}