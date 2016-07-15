import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, ActivatedRoute} from '@angular/router';
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
  private sub: any;
  constructor(private _users: Users, private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this._activatedRoute.params.subscribe(params => {
      this.users = this._users.getUsersByCompany(params['companyName']);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
