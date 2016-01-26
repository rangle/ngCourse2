import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import Header from '../components/header/header';
import Main from '../components/main/main';
import Login from '../components/login/login';

@Component({
  selector: 'ngc-root',
  directives: [ROUTER_DIRECTIVES, Header, Login],
  template: `
  <ngc-header></ngc-header>
  <div class="container px2 mt4">
    <login></login>
    <router-outlet></router-outlet>
  </div>
  `
})
@RouteConfig([{
  path: '/tasks/...',
  name: 'Main',
  component: Main,
  useAsDefault: true
}, {
  path: '/',
  redirectTo: ['Main']
}])
export default class App {}
