import {Component} from 'angular2/core';
import Users from '../services/users-service';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import CompanyList from '../components/company-list';
import UsersListContainer from './users-list-container';
import UserDetail from '../components/user-detail';

@Component({
  selector: 'companies-home',
  template: 'Select company name to display users'
})
export class CompaniesHome {}

@Component({
  directives: [ROUTER_DIRECTIVES, CompanyList]
  selector: 'companies',
  template: `
  <div style="border: 1px solid black; padding: 10px; display: flex">
    <div style="width: 40%">
      <company-list [companies]="companies"></company-list>
    </div>
    <div style="flex: 1">
      Display Child Routes Here
    </div>

  </div>
  `,
  providers: [Users],
  
})
/*
Complete the routing definition so going to /:companyName will display the list of users for that company,
you can make use of the existing UsersListContainer if you wish.
*/
@RouteConfig([
  { path: '/', 
    useAsDefault: true,  
    component: CompaniesHome, 
    name: 'CompaniesHome' 
  }
])
export default class Companies { 
  public companies:any;
  
  constructor(private _users: Users) {
    
  }  
  
  ngOnInit() {
   
    this.companies = this._users.getCompanyNames();
  }
}

