import { RouterConfig } from '@angular/router';
import TaskAdd from '../components/task-add/task-add';
import TaskEdit from '../components/task-edit/task-edit';
import Summary from '../components/summary/summary';

 export const TASK_ROUTES: RouterConfig = [{
  path: '',
  component: Summary,
}, {
  path: 'add',
  component: TaskAdd
}, {
  path: ':id',
  component: TaskEdit
}];