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
      <a [routerLink]="['Users']">Users List</a>
    </li>
    <li>
      <a [routerLink]="['Companies']">Company List</a>
    </li>
  </ul>
  <div style="border: 1px solid black; padding: 10px;">
    <router-outlet></router-outlet>
  </div>
  `})
@RouteConfig([
  {path: '/', as: 'Home', component: Home},
  {path: '/users/...', as: 'Users', component: UsersContainer},
  {path: '/companies/...', as: 'Companies', component: Companies}
  ])
export class App {
  public userNames: any;
  constructor(private _users: Users) {
    
  }
  ngOnInit() {
   this.userNames = this._users.getUserNames();
  }
}