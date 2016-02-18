import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import UserDetail from '../components/user-detail';
import UserList from '../components/user-list';
import CompanyList from '../components/company-list';
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
      <a>Home</a>
    </li>
    <li>
      <a>Users List</a>
    </li>
    <li>
      <a>Company List</a>
    </li>
  </ul>
  <div style="border: 1px solid black; padding: 10px;">
    <home>
      <p>
      Setup the appropiate router-outlet directive, 
      and use a default route to load the home component. 
      </p>
    </home>
  </div>
`})
@RouteConfig([
  /* 
    Complete the Route Config Definition for:
      * /users - Route to the UsersList component 
      * /company - Route to the Company List Component
      * /  - Default route, for the Home component
  */
])
export class App {
  public userNames: any;
  constructor(private _users: Users) {
    
  }
  ngOnInit() {
   this.userNames = this._users.getUserNames();
  }
}