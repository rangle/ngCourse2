import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import Users from '../services/users-service';

@Component({
  selector: 'ngc-app',
  directives: [ROUTER_DIRECTIVES],
  providers: [Users],
  styleUrls: [`app/containers/app.css`]
  template: `<div>
  <ul>
   <li>
      <a [routerLink]="['']">Home</a>
    </li>
    <li>
      <a [routerLink]="['users']">Users</a>
    </li>
    <li>
      <a [routerLink]="['companies']">Companies</a>
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
