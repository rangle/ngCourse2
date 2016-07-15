import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import UserDetail from '../components/user-detail';
import UserList from '../components/user-list';
import CompanyList from '../components/company-list';
import Users from '../services/users-service';
import Home from '../components/home';
@Component({
  selector: 'ngc-app',
  directives: [ROUTER_DIRECTIVES],
  providers: [Users],
  styleUrls: [`app/containers/app.css`]
  template: `<div>
  Routing - Using Route Params
  <ul>
   <li>
      <a [routerLink]="['Home']">Home</a>
    </li>
    <li>
      <a [routerLink]="['UserList']">Users List</a>
    </li>
    <li>
      <a [routerLink]="['CompanyList']">Company List</a>
    </li>
  </ul>
  <div style="border: 1px solid black; padding: 10px;">
    <router-outlet></router-outlet>
  </div>
	`})
@RouteConfig([
  {path: '/', as: 'Home', component: Home},
  {path: '/users', as: 'UserList', component: UserList},
  {path: '/users/:id', as: 'UserDetail', component: UserDetail},
  {path: '/companies', as: 'CompanyList', component: CompanyList}
  ])
export class App {
  public userNames: any;
  constructor(private _users: Users) {

  }
  ngOnInit() {
   this.userNames = this._users.getUserNames();
  }
}
