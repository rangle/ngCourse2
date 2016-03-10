import {Component, View, Inject} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import Header from '../components/header/header';
import Login from './login/login';
import Tasks from './tasks/tasks';
import StateService from '../services/state-service';

@Component({
  template:'test'
})
class Test {

}

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
  name: 'Tasks',
  component: Tasks,
  useAsDefault: true
}, {
  path: '/',
  redirectTo: ['Tasks']
},{
  path: '/test',
  component: Test,
  as: 'Test'
}
])
export default class App {
  constructor(stateService: StateService)
  {
    
  }
}
