import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';
import Users from '../services/users-service';
import UsersList from '../components/user-list';
@Component({
  directives: [UsersList],
  selector: 'users-users-container',
  template: `
    <user-list [users]="users"></user-list>`,
  providers: [Users],
})
export default class UsersListContainer {
  public users: any;
  constructor(private _users: Users, private _routeParams: RouteParams) {

  }

  get companyName(): string {
    return this._routeParams.get('companyName');
  }
  ngOnInit() {
    this.users = this._users.getUsersByCompany(this.companyName);
    
  }
}