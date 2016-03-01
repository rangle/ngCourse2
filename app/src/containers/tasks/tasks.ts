import {Component, Inject, OnDestroy, OnInit} from 'angular2/core';
import {bindActionCreators} from 'redux';
import {Router, RouteConfig, RouterOutlet} from 'angular2/router';
import {TaskMap} from '../../services/tasks-service';
import AuthService from '../../services/auth-service';
import TaskAdd from '../task-add/task-add';
import TaskEdit from '../task-edit/task-edit';
import Summary from '../summary';
import TaskGrid from '../../components/task-grid/task-grid';
import {StatusPipe} from '../../pipes/status';
import {OwnerTasksPipe} from '../../pipes/owners';
import * as TaskActions from '../../actions/tasks';
import {List} from 'immutable';
const TASKS_TEMPLATE = require('./tasks.html');
@Component({
  selector: 'ngc-main',
  pipes: [OwnerTasksPipe, StatusPipe],
  directives: [RouterOutlet, TaskGrid],
  template: TASKS_TEMPLATE
})
@RouteConfig([{
  path: '/',
  name: 'TaskSummary',
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
export default class Tasks implements OnDestroy, OnInit {

  protected unsubscribe: Function;
  tasks: List<TaskMap>;
  owner: string;
  taskStatus: string;
  loadTasks: Function;
  deleteTask: Function;
  updateTask: Function;
  markTask: Function;

  constructor(
    @Inject('ngRedux') private ngRedux,
    public authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.unsubscribe = this.ngRedux.connect(
      this.mapStateToThis,
      this.mapDispatchToThis
    )(this);

    this.loadTasks();

    if (!this.authService.isLoggedIn()) {
      this._router.navigate(['/Login']);
    }
  }

  ngOnDestroy() {
    this.unsubscribe();
  }


  mapStateToThis(state) {
    const owner = state.filters.get('owner');
    const taskStatus = state.filters.get('taskStatus')
    const isDone = taskStatus === 'completed';

    return {
      tasks: state.tasks.filter(n=> {
        return (n.get('done') === isDone || taskStatus === 'all')
          && (n.get('owner') === owner || owner === 'everyone')
      }),
      owner: owner,
      taskStatus: taskStatus
    };
  }

  editTask(taskId) {
    
    this._router.navigate(['Tasks', 'TaskEdit', { id: taskId }])
  }

  mapDispatchToThis(dispatch) {
    return {
      deleteTask: (task) => dispatch(TaskActions.deleteTask(task)),
      loadTasks: () => dispatch(TaskActions.loadTasks()),
      markTask: ({task, newStatus}) => dispatch(TaskActions.markTask(task, newStatus))
    }
  }
}
