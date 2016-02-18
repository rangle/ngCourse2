import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import UserDetail from '../components/user-detail';
import UserList from '../components/user-list';
import UsersContainer from './users';
import CompanyList from '../components/company-list';
import Companies from './companies';
import Users from '../services/users-service';
import Home from '../components/home';
@Component({
  selector: 'ngc-app',
  directives: [ROUTER_DIRECTIVES],
  providers: [Users],
  styleUrls: [`app/containers/app.css`]
  template: `<div>
  <ul>
   <li>
      <a [routerLink]="['Home']">Home</a>
    </li>
    <li>
      <!-- Create Link To Users Section -->
    </li>
    <li>
      <!-- Create Link To Company Section -->
    </li>
  </ul>
  <div style="border: 1px solid black; padding: 10px;">
    <router-outlet></router-outlet>
  </div>
  `})
/*
  - Complete the RouteConfig definition so ./containers/users.ts has child routes
  - Complete the RouteConfig definition so ./containers/companies.ts has child routes
*/  
@RouteConfig([
  {path: '/', as: 'Home', component: Home}
  ])
export class App {
  public userNames: any;
  constructor(private _users: Users) {
    
  }
  ngOnInit() {
   this.userNames = this._users.getUserNames();
  }
}