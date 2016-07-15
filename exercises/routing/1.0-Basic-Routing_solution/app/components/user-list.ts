import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import Users from '../services/users-service';
import {JsonPipe} from '@angular/common';
@Component({
  directives: [ROUTER_DIRECTIVES],
  selector: 'user-list',
  template: `<ul>
    <li *ngFor="let user of users">
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
