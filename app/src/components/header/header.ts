import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import LogoIcon from '../icons/logo';
import {AuthService} from '../../services/auth-service';
const TEMPLATE = require('./header.html');

@Component({
  selector: 'ngc-header',
  directives: [ROUTER_DIRECTIVES, LogoIcon],
  template: TEMPLATE
})
export default class Header {

  private today: Date;

  constructor(public authService: AuthService) {
    this.today = new Date();
  }
  
  logout() {
    this.authService.logout();
  }
}
