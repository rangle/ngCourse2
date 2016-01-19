import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';
import TaskAdd from '../components/task-add/task-add';
import TasksList from '../components/tasks-list/tasks-list';

@Component({
  selector: 'ngc-tasks',
  directives: [RouterOutlet, TasksList],
  template: `
    <router-outlet></router-outlet>
    <ngc-tasks-list></ngc-tasks-list>
  `
})
@RouteConfig([{
  path: '/add',
  name: 'TaskAdd',
  component: TaskAdd
}])
export default class TasksListContainer {}
