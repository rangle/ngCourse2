import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import Users from '../services/users-service';
import {JsonPipe} from 'angular2/common';
@Component({
  directives: [ROUTER_DIRECTIVES],
  selector: 'user-list',
  template: `<ul>
    <li *ngFor="#user of users">
      {{user.first}} {{user.last}}
     </li>
  </ul>
  `,
  providers: [Users],
  pipes: [JsonPipe]
})
export default class UserList {
  public users: any;
  constructor(private _users: Users) {

  }

  ngOnInit() {


    this.users = this._users.getUserNames();
  }
}