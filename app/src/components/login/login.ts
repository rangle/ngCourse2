import {Component} from 'angular2/core';
import {AuthService} from '../../services/auth-service';
const TEMPLATE = require('./login.html');

@Component({
  selector: 'login',
  template: TEMPLATE
})
export default class LoginComponent {
  message: string;

  constructor(public authService: AuthService) {
    this.message = '';
  }

  login(username: string, password: string): boolean {
    this.message = '';
    if (!this.authService.login(username, password)) {
      this.message = 'Incorrect credentials.';
      return false;
    }
    return true;
  }

  logout(): boolean {
    this.authService.logout();
    return false;
  }
}
