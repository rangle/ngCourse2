import {Component, Input} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import Users from '../services/users-service';
import {JsonPipe} from 'angular2/common';
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
    <li *ngFor="#user of users">
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
