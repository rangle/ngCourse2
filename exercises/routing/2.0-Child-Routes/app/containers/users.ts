import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import UserDetail from '../components/user-detail';
import UserList from '../components/user-list';
import CompanyList from '../components/company-list';
import Users from '../services/users-service';
import Home from '../components/home';

@Component({
  selector: 'users-home',
  template: 'Users List Home Route'
})
class UsersHome {}

@Component({
  selector: 'ngc-app',
  directives: [ROUTER_DIRECTIVES, UserList],
  providers: [Users],
  styleUrls: [`app/containers/app.css`]
  template: `<div>
  <div style="border: 1px solid black; padding: 10px; display: flex">
    <div style="width: 40%;">
    <user-list [users]="users"></user-list>
    </div>
    <div style="flex: 1">
      Display Child Routes Here
    </div>
  </div>
	`})
/*
Complete the @RouteConfig definition to load the
user details in DIV that currently says 'Display Child Routes Here'
*/
@RouteConfig([
  {path: '/', as: 'Home', component: Home, useAsDefault: true},
  ])
export default class UsersContainer {
  public users: any;
  constructor(private _users: Users) {

  }
  ngOnInit() {
   this.users = this._users.getUserNames();
  }
}
