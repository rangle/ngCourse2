import {Component, Inject, OnDestroy, OnInit} from 'angular2/core';
import {bindActionCreators} from 'redux';
import {Router, RouteConfig, RouterOutlet} from 'angular2/router';
import {TaskMap} from '../services/tasks-service';
import AuthService from '../services/auth-service';
import TaskAdd from './task-add/task-add';
import TaskEdit from './task-edit/task-edit';
import TasksList from '../components/tasks-list/tasks-list';
import Summary from './summary';
import Grid from '../components/grid/grid';
import {StatusPipe} from '../pipes/status';
import {OwnerTasksPipe} from '../pipes/owners';
import * as TaskActions from '../actions/tasks';
import {List} from 'immutable';

@Component({
  selector: 'ngc-main',
  pipes: [OwnerTasksPipe, StatusPipe],
  directives: [RouterOutlet, Grid],
  template: `
    <router-outlet></router-outlet>
    <ngc-grid
      [tasks]="tasks | ownerTasks:owner | status:taskStatus"
      [deleteTask]="deleteTask"
      [updateTask]="updateTask"
      [markTask]="markTask">
    </ngc-grid>
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
export default class Main implements OnDestroy, OnInit {

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
  ) {}

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
    return {
      tasks: state.tasks,
      owner: state.filters.get('owner'),
      taskStatus: state.filters.get('taskStatus')
    };
  }

  mapDispatchToThis(dispatch) {
    return bindActionCreators(TaskActions, dispatch); 
  }
}
