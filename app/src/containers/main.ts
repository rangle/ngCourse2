import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';
import TaskAdd from '../components/task-add/task-add';
import TasksList from '../components/tasks-list/tasks-list';

@Component({
  selector: 'tasks',
  directives: [RouterOutlet],
  template: `
  <router-outlet></router-outlet>
  `
})
@RouteConfig([{
  path: '/',
  name: 'TasksList',
  component: TasksList,
  useAsDefault: true
}, {
  path: '/add',
  name: 'TaskAdd',
  component: TaskAdd
}])
export default class Main {}
