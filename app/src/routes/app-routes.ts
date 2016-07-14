import { RouterConfig } from '@angular/router';

import Main from '../components/main/main';
import Login from '../components/login/login';
import {TASK_ROUTES} from './task-routes';

export const APP_ROUTES: RouterConfig = [{
  pathMatch: 'full',
  path: '',
  redirectTo: 'login'
}, {
  path: 'login',
  component: Login
}, {
  path: 'tasks',
  component: Main,
  children: TASK_ROUTES
}];
