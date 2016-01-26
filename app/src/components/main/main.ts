import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';
import TaskAdd from '../task-add/task-add';
import TaskEdit from '../task-edit/task-edit';
import TasksList from '../tasks-list/tasks-list';
import Summary from '../summary/summary';
import TasksService from '../../services/tasks-service';

@Component({
  selector: 'ngc-main',
  directives: [RouterOutlet, TasksList],
  template: `
    <router-outlet></router-outlet>
    <ngc-tasks-list></ngc-tasks-list>
  `
})
@RouteConfig([{
  path: '/',
  name: 'TasksList',
  component: Summary,
  useAsDefault: true
}, {
  path: '/add',
  name: 'TaskAdd',
  component: TaskAdd
}, {
  path: '/:id',
  name: 'TaskEdit',
  component: TaskEdit
}])
export default class Main {}
