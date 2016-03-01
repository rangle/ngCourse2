import {Component, View, Inject} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import KitchenSink from './kitchen-sink/kitchen-sink';
import {Header} from '../components';
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
@RouteConfig([
  {
    path: '/tasks/...',
    as: 'Main',
    component: Main,
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
export default class App {}

