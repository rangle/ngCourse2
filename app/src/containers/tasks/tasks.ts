import {Component, Inject, OnDestroy, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {PlaceHolder} from '../../components';
import {TaskGrid} from '../../components';
import TaskAdd from '../task-add/task-add';
import TaskEdit from '../task-edit/task-edit';
import {deleteTask, markTask} from '../../actions/tasks';
const TEMPLATE = require('./tasks.html');
@Component({
  selector: 'ngc-main',
  template: TEMPLATE,
  directives: [TaskGrid, ROUTER_DIRECTIVES]
})
@RouteConfig([{
  path: '/',
  name: 'TaskSummary',
  component: PlaceHolder,
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
  

  constructor(@Inject('ngRedux') private _ngRedux, private _router: Router) { }

  ngOnInit() {
    this.unsubscribe = this._ngRedux.connect(
      (state) => this.mapStateToThis(state))(this)

      
  }

  ngOnDestroy() {
    this.unsubscribe() 
  }


  mapStateToThis(state) {

    return {
      tasks: state.tasks
    };
    
  }

  editTask(id) {
    this._router.navigate(['Tasks', 'TaskEdit', { id }])
    
  }

  deleteTask(taskId) {
    this._ngRedux.dispatch(deleteTask(taskId))

  }

  markTask({task, newStatus}) {
    this._ngRedux.dispatch(markTask(task.get('_id'), newStatus))
    

  }

  
}
