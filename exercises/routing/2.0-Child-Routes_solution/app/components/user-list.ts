import {Component, Input} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import Users from '../services/users-service';
import {JsonPipe} from '@angular/common';
@Component({
  directives: [ROUTER_DIRECTIVES],
  selector: 'user-list',
  styles:[`

  .router-link-active:after {
    content: '-->'
  }
  `]
  template: `
  <ul>
    <li *ngFor="let user of users">
      <a [routerLink]="['/Users','UserDetail',{id: user.id}]">
        {{user.first}} {{user.last}}
       </a>
     </li>
  </ul>
  `,
  providers: [Users],
  pipes: [JsonPipe]
})
export default class UserList {
  @Input() users: any;
  @Input() companyName: string;
  constructor(private _users: Users) {

  }
}
