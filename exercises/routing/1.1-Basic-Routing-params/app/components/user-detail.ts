import {Component} from 'angular2/core';
import Users from '../services/users-service';

@Component({
  selector: 'user-detail',
  template: `<label>First Name: </label> {{user?.name?.first}} <br/>
            <label>Last Name: </label> {{user?.name?.last}} <br/>
            <label>Email: </label> {{user.email}}
  `,
  providers: [Users]
})
export default class UserDetail {
  public user: any;
  /* Inject Correct Service to access Params */
  constructor(private _users: Users) {

  }

  get userId(): string {
    return 'correct user id from the router params';
  }

  ngOnInit() {
    this.user = this._users.getUserById(this.userId);
  }
}