import {Component, Input} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
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
    <!-- Fix the [routerLink] so that any where in the application,
    we are able to route to #/users/:id, so when clicking on a user name
    for a company, we will be taken to 127.0.0.1:8080/#/users/:id
    -->
      <a [routerLink]="[user.id]">
        {{user.first}} {{user.last}}
       </a>
     </li>
  </ul>
  `,
  providers: [Users]
})
export default class UserList {
  @Input() users: any;
}
