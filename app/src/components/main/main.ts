import {Component, Injector} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AuthService} from '../../services/auth-service';
import TasksList from '../tasks-list/tasks-list';
import TasksService from '../../services/tasks-service';

@Component({
  selector: 'ngc-main',
  directives: [RouterOutlet, TasksList],
  template: `
    <router-outlet></router-outlet>
    <ngc-tasks-list></ngc-tasks-list>
  `
})
export default class Main {

  constructor(
    public authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this._router.navigate(['login']);
    }
  }
}
