import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import Users from '../services/users-service';
import Home from '../components/home';
@Component({
  selector: 'ngc-app',
  directives: [ROUTER_DIRECTIVES, Home],
  providers: [Users],
  styleUrls: ['app/containers/app.css'],
  template: `<div>
  Basic Routing
  <!-- use the routerLink directive to provide links to the Home,
    UsersList, and CompanyList component -->
  <ul>
   <li>
      <a [routerLink]="['']">Home</a>
    </li>
    <li>
      <a [routerLink]="['users']">Users List</a>
    </li>
    <li>
      <a [routerLink]="['companies']">Company List</a>
    </li>
  </ul>
  <div style="border: 1px solid black; padding: 10px;">
    <router-outlet></router-outlet>
  </div>
`})
export class App {
  public userNames: any;
  constructor(private _users: Users) {

  }
  ngOnInit() {
   this.userNames = this._users.getUserNames();
  }
}
