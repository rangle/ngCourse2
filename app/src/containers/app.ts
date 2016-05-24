import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
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
@RouteConfig([{
  path: '/login',
  name: 'Login',
  component: Login
}, {
  path: '/tasks/...',
  name: 'Main',
  component: Main,
  useAsDefault: true
}, {
  path: '/',
  redirectTo: ['Main']
}
])
export default class App {}
