import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import Main from './main';

@Component({
  selector: 'root',
  directives: [ROUTER_DIRECTIVES],
  template: `
  <div class="container px2">
    <header class="mb3 py3">
      <h1 class="h1 caps m0 navy">
        ngCourse2
      </h1>
      <div class="sm-flex flex-baseline flex-wrap mxn1 h6">
        <div class="bold gray px1">
          Sun Jan 14, 2016
        </div>
        <div class="flex-auto"></div>
        <a [routerLink]="['Main']"
          class="caps ml1 mr1 button button-link">
          Tasks
        </a>
        <a [routerLink]="['Main', 'TaskAdd']"
          class="caps ml1 mr1 button button-link">
          Add
        </a>
        <a href="https://github.com/rangle/ngcourse2"
          class="caps ml1 mr1 button button-link">
          github
        </a>
      </div>
    <hr class="mt1 mb1 b2 border--red">
    </header>
    <router-outlet></router-outlet>
  </div>
  `
})
@RouteConfig([{
  path: '/',
  redirectTo: ['Main']
}, {
  path: '/tasks/...',
  name: 'Main',
  component: Main,
  useAsDefault: true
}])
export default class App {}
