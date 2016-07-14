import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import Header from '../components/header/header';
import Main from '../components/main/main';
import Login from '../components/login/login';

@Component({
  selector: 'ngc-root',
  directives: [ROUTER_DIRECTIVES, Header],
  template: `
  <ngc-header></ngc-header>
  <div class="container px2 mt4">
    <router-outlet></router-outlet>
  </div>
  `
})
export default class App {}
