import {Component, Inject, OnDestroy, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {PlaceHolder} from '../../components';
import {TaskGrid} from '../../components';
import TaskAdd from '../task-add/task-add';
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
    component: PlaceHolder
  }])
export default class Tasks implements OnDestroy, OnInit {

  protected unsubscribe: Function;
  

  constructor(@Inject('ngRedux') private _ngRedux) { }

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

  editTask(taskId) {
    console.log(`Task ${taskId} edit clicked`);
    
  }

  deleteTask(task) {
    console.log(`Task ${task} delete clicked`);

  }

  markTask({task, newStatus}) {
    console.log(`Task ${task} mark clicked`);

  }

  
}
