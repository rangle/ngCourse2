import {Component, View, Inject} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import KitchenSink from './kitchen-sink/kitchen-sink';


@Component({
  selector: 'ngc-root',
  directives: [ROUTER_DIRECTIVES, KitchenSink],
  template: `
  
    <router-outlet></router-outlet>
 
  `
})
@RouteConfig([
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
