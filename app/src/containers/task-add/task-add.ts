import {Component, Inject, OnDestroy, OnInit} from 'angular2/core';
import {bindActionCreators} from 'redux';
import TaskForm from '../../components/task-form/task-form';
import {Router} from 'angular2/router';
const TEMPLATE = require('./task-add.html');
import * as TaskActions from '../../actions/tasks';

@Component({
  selector: 'ngc-task-add',
  directives: [TaskForm],
  template: TEMPLATE
})
export default class TaskAdd implements OnDestroy, OnInit {

  protected unsubscribe: Function;
  addTask: Function;
  

  constructor( 
    @Inject('ngRedux') private ngRedux, 
    public _router: Router) { }

  ngOnInit() {
    this.unsubscribe = this.ngRedux.connect(
      this.mapStateToThis, 
      this.mapDispatchToThis
    )(this);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  mapStateToThis(state) {
    return { };
      
  }

  mapDispatchToThis(dispatch) {
    return bindActionCreators(TaskActions, dispatch);
  }

  submitTask(newTask): void {
    
    this.addTask(newTask, () => {
      this._router.navigate(['/Main']);
    });
  }
}
