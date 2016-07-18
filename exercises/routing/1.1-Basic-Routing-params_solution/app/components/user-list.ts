import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import Users from '../services/users-service';
import {JsonPipe} from '@angular/common';
@Component({
  directives: [ROUTER_DIRECTIVES],
  selector: 'user-list',
  template: `<ul>
    <li *ngFor="let user of users">
      <a [routerLink]="['/users', user.id]">
        {{user.first}} {{user.last}}
      </a>
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
