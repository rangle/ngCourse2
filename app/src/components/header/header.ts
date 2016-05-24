import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router-deprecated';
import LogoIcon from '../icons/logo';
import {AuthService} from '../../services/auth-service';
const TEMPLATE = require('./header.html');

@Component({
  selector: 'ngc-header',
  directives: [RouterLink, LogoIcon],
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
