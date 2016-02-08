import {Component, Injector} from 'angular2/core';
import {Router, RouteConfig, RouterOutlet} from 'angular2/router';
import {AuthService} from '../../services/auth-service';
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
export default class Main {

  constructor(
    public authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this._router.navigate(['/Login']);
    }
  }
}
