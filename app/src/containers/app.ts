import {Component, View, Inject} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import Header from '../components/header/header';
import Login from '../components/login/login';
import Main from './main';

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
