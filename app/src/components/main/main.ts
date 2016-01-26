import {Component, Injector} from 'angular2/core';
import {RouteConfig, RouterOutlet, CanActivate} from 'angular2/router';
import TaskAdd from '../task-add/task-add';
import TaskEdit from '../task-edit/task-edit';
import TasksList from '../tasks-list/tasks-list';
import Summary from '../summary/summary';
import TasksService from '../../services/tasks-service';
import {AuthService} from '../../services/auth-service';

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
@CanActivate(
  (nextInstr: any, currInstr: any) => {
    let injector: any = Injector.resolveAndCreate([AuthService]);
    let authService: AuthService = injector.get(AuthService);
    return authService.isLogged();
  }
)
export default class Main {}
