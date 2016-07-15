import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import Users from '../services/users-service';
import {JsonPipe} from '@angular/common'
@Component({
  selector: 'user-detail',
  template: `<label>First Name: </label> {{user?.name?.first}} <br/>
            <label>Last Name: </label> {{user?.name?.last}} <br/>
            <label>Email: </label> {{user?.email}}
  `,
  providers: [Users],
  pipes: [JsonPipe]
})
export default class UserDetail {
  public user:any;
  private sub: any;
  constructor(private _users: Users, private _activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.sub = this._activatedRoute.params.subscribe(params => {
      this.user = this._users.getUserById(params['id']);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
