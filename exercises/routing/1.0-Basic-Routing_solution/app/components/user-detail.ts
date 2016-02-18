import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import Users from '../services/users-service';
import {JsonPipe} from 'angular2/common'
@Component({
  selector: 'user-detail',
  template: `<label>First Name: </label> {{user.name.first}} <br/>
            <label>Last Name: </label> {{user.name.last}} <br/>
            <label>Email: </label> {{user.email}}
  `,
  providers: [Users],
  pipes: [JsonPipe]
})
export default class UserDetail { 
  public user:any;
  constructor(private _users: Users, private _routeParams: RouteParams) {
    
  }  
  
  ngOnInit() {
    
    
    this.user = this._users.getUserById(this._routeParams.get('id'));
  }
}