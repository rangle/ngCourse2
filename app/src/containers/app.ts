import {Component, View, Inject} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import KitchenSink from './kitchen-sink/kitchen-sink';
import {Header} from '../components';
import Tasks from './tasks/tasks';
@Component({
  selector: 'place-holder',
  template: 'TODO: Complete',
})
class PlaceHolder {

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
@RouteConfig([
  {
    path: '/login',
    as: 'Login',
    component: PlaceHolder
  },
  {
    path: '/tasks/...',
    name: 'Tasks',
    component: Tasks,
    useAsDefault: true
  },
  {
    path: '/kitchen-sink',
    as: 'KitchenSink',
    component: KitchenSink
  },
  {
    path: '/',
    redirectTo: ['KitchenSink']
  }
])
export default class App { }

